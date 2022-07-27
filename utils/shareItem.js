let currentHost=typeof window !== 'undefined' ? window.location.hostname : 'https://www.tak.live';
let whatsappVideoShareUrlText = 'क्या आपने यह खबर देखी है?%0a';
let whatsappDownloadAppText = 'डाउनलोड करें TAK App:%0a https://newstak.app.link/1x2XTv7n7kb';
let shortsVideoShareUrlText = '30 सेकंड में खबरें फटाफट:%0a';
let liveShareUrlText = 'Watch us live on TAK:%0a'

const ShareItem =  {
    shareToWhatsapp : (sefUrl,source,videoId,title) => {
        let url;
        if(source && source=='shorts'){
            if(sefUrl){
              let [category,sef] = [sefUrl.split('/')[0],sefUrl.split('/')[2]];
              url = 'https://api.whatsapp.com/send?phone&text='+shortsVideoShareUrlText+currentHost+'/'+category+'/shorts/'+sef+'%0a%0a '+whatsappDownloadAppText;
            }else{
              url = 'https://api.whatsapp.com/send?phone&text='+shortsVideoShareUrlText+currentHost+'/shorts/watch-'+title+'-'+videoId+'%0a%0a '+whatsappDownloadAppText;
            }
            window.open(url,'_blank');
          }else{
            if(sefUrl){
              let [category,sef] = [sefUrl.split('/')[0],sefUrl.split('/')[2]];
              url = 'https://api.whatsapp.com/send?phone&text='+shortsVideoShareUrlText+currentHost+'/'+category+'/video/'+sef+'%0a%0a '+whatsappDownloadAppText;
            }else{
              url = 'https://api.whatsapp.com/send?phone&text='+whatsappVideoShareUrlText+currentHost+'/video/watch-'+title+'-'+videoId+'%0a%0a '+whatsappDownloadAppText;
            }
            window.open(url,'_blank');
          }

    },
    shareLiveStreamToWhatsapp : (liveUrl) => {
      let url = 'https://api.whatsapp.com/send?phone&text='+liveShareUrlText+liveUrl;
      window.open(url,'_blank');
    }
};

export default ShareItem;