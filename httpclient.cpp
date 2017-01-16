/*
HTTP Client External Object library for Extendscript.
(Supported Adobe Illustrator, Photoshop, Bridge and Indesign)
Extendscript用Extenrnal Object。 ESTKに付属するSampleLibプロジェクトを参考に導入して下さい。
Extendscript側からは
alert(getHTTP("http://chuwa.iobb.net"));
の様な形でURLを引数として与えてコールします。
*/
#include "HttpClient.h"
#include "SoSharedLibDefs.h"
#include "SoCClient.h"
#include <stdlib.h>
#include <stdio.h>

#include <sys/types.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/param.h>
#include <unistd.h>

#if defined (_WINDOWS)
#pragma warning( push )
#pragma warning(disable : 4996) // Security warning about strcpy on win
#define strdup _strdup
#endif

#define BUF_LEN 256
#define MAX_MSGSIZE 2048
#define MSGSIZE 32


struct URL //URLを扱うための構造体 charは256文字以内
{
    char host[BUF_LEN];
    char path[BUF_LEN];
    char query[BUF_LEN];
    char fragment[BUF_LEN];
    unsigned short port;
};

void parseURL(const char *urlStr, struct URL *url, char **error); //URLパーサー関数定義（本体は後ろ）

static long libraryVersionNumber = 1; //ライブラリバージョン

static char* signatures = //標準のsignature
	"setVersion_d,"			// setVersion (int) 
	"createObject_ss,"	// createObject (string, string)
	"createArray,"			// createArray() 
	"paramAny_a,"				// paramAny (any)
	"paramString_s,"		// paramString (string)
	"paramBool_b,"			// paramBool (bool) 
	"paramUInt32_u,"		// paramUInt (unsigned int)
	"paramInt32_d,"			// paramInt (signed int) 
	"paramFloat64_f"		// paramFloat64 (double)
	"built"							// built() -> string
;

#if MAC
#define unused(a) (void*) a ;
#else
void* unused(void* x){ return x;} ;
#endif

extern "C" HTTPCLIENT long ESGetVersion()
{
	return libraryVersionNumber;
}

extern "C" HTTPCLIENT char* ESInitialize (TaggedData* argv, long argc) //Extendscript側から利用するイニシャライザ
{
	unused(&argv);
	unused(&argc);
	return signatures;
}

extern "C" HTTPCLIENT void ESTerminate()
{
}


extern "C" HTTPCLIENT long setVersion (TaggedData* argv, long argc, TaggedData* result)
{
	/* to keep compiler warnings from popping up */
	result = NULL;
	if (argc >= 1) libraryVersionNumber = argv [0].data.intval;

	return kESErrOK;
}

/*
引数はURL（"http://www.chuwa.iobb.net/test.php?data=10024"）の様な形で与えられる。
TaggedData構造体はint・long・string・array等の各種型が含まれるため、どういった形の引数でも受け取ることが出来る。
longで受けるargcは引数の数。retvalは返り値でTaggedData構造体を指定している為返す形式は後で決める。
*/
extern "C" HTTPCLIENT long getHTTP (TaggedData* argv, long argc, TaggedData* retval) //HTTPクライアント用
{
    int s; //ソケット用 descripter
    struct addrinfo hints, *res; //struct in_addr addr;
    int err; 
    char *urlstrng;
    char send_buf[BUF_LEN]; //送信クエリの為のバッファ
    
    struct URL url = { "chuwa-print.co.jp", "/", 80 };
    
    if (argc == 1)
    {
        char *error = NULL;
        urlstrng = argv[0].data.string;
        parseURL(urlstrng, &url, &error);
        if (error) return kESErrBadURI; //kESErrBadURI は整数で31と定義されている。Extendscript側では対応するエラーメッセージを受け取ることになる。
    }
	//ソケットの構成
    memset(&hints, 0, sizeof(hints));// clear to 0
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_family   = AF_INET;
    
    char *serviceType = "http";
    
    if ((err = getaddrinfo(url.host, serviceType, &hints, &res)) != 0)
    {
        return kESErrBadURI;
    }
    if ((s = socket(res->ai_family, res->ai_socktype, res->ai_protocol)) < 0)
    {
        return kESErrIO; //エラー定義はSoSharedLibDef.hにある。エラーメッセージは受け取るアプリケーションよってはローカライズされる。
    }
    
    if (connect(s, res->ai_addr, res->ai_addrlen) != 0)
    {
        return kESErrNoResponse;
    }
    sprintf(send_buf, "GET %s%s HTTP/1.0\r\n", url.path, url.query); //送信用クエリを組み立てて送信用バッファに格納
    write(s, send_buf, strlen(send_buf)); //バッファに格納されたクエリを送信。プロトコル仕様に関してはW3Cの資料を参照のこと
    sprintf(send_buf, "Host: %s:%d\r\n", url.host, url.port); //以下バッファ上にクエリを組み立て順次送信する
    write(s, send_buf, strlen(send_buf));
    sprintf(send_buf, "\r\n");
    write(s, send_buf, strlen(send_buf)); //空改行で送信終了となる
    /*送信終了後サーバレスポンスはソケットのバッファに蓄積されるのでこれを取出していく必要がある*/
    int read_size;
    char tmp[MAX_MSGSIZE]; //受信用テンポラリ
    int ctr;
    ctr = 0;
    while (ctr<MAX_MSGSIZE)//とりあえず最大取得可能文字数を制限してある。必要ならwhileの引数とtmpのサイズを調整する
    {
        char buf[BUF_LEN];//読み込みバッファの定義
        read_size = read(s, buf, BUF_LEN); //ソケットから読み込みバッファに受信データを取り込む
        if (read_size > 0) //取り出したデータがある場合
        {
            sprintf(tmp,"%s", buf);//テンポラリに読み込みバッファの内容を結合
        }
        else
        {
            break; //ソケット側が空なら受信終了
        }
    }
    close(s); //ソケットをクローズする。

    retval->type = kTypeString; //返り値の型はstring
    retval->data.string = tmp; //retvalの構造体のstringにテンポラリ（char）をそのまま渡す。
    return kESErrOK; //kESErrOKは0を返す。正常終了した場合、返り値のtypeがチェックされ構造体内の適切な値がExtendscript側に返される
}

/*
URLパーサー
「http://」や「/」、「#」、「?」を目印に引数で与えられた文字列をパスやクエリに分解する。
ポートは80番で決め打ち
*/
void parseURL(const char *urlStr, struct URL *url, char **error)
{
    char host_path[BUF_LEN];
    
    if (strlen(urlStr) > BUF_LEN - 1)
    {
        return;
    }
    
    if (strstr(urlStr, "http://") && sscanf(urlStr, "http://%s", host_path) && strcmp(urlStr, "http://"))
    {
        char *p = NULL;
        
        p = strchr(host_path, '#');
        if (p != NULL)
        {
            strcpy(url->fragment, p);
            *p = '\0';
        }
        
        p = strchr(host_path, '?');
        if (p != NULL)
        {
            strcpy(url->query, p);
            *p = '\0';
        }
        else
        {
            strcpy(url->query, "");
        }
        
        p = strchr(host_path, '/');
        if (p != NULL)
        {
            strcpy(url->path, p);
            *p = '\0';
        }
        
        strcpy(url->host, host_path);

        url->port = 80;
        
    }
    else
    {
        return;
    }
}



#if defined (_WINDOWS)
#pragma warning( pop )
#endif

