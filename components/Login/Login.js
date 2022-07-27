import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getUserProfileAction, isLoggedInAction, takLoginAction } from '../../store/auth/authAction';
import { signInWithGoogle } from '../../utils/firebase/firebase';

const Login = () => {

    const [userPreferenceChannelIds,setUserPreferenceChannelIds]=useState([]);
    const [sourceChecked,setSourceChecked]=useState(true);
    const [sourceUrl,setSourceUrl]=useState('/');
    const dispatch=useDispatch();
    const router = useRouter();

    useEffect(()=>{
        if(localStorage.getItem('userChannelPreference')){
            let ids=localStorage.getItem('userChannelPreference');
            setUserPreferenceChannelIds(JSON.parse(ids)?.ids)
        }else{
            setUserPreferenceChannelIds([]);
        }
        if(router.isReady){
            if(router.query.source){
                setSourceUrl((state)=>'/'+router.query.source);
            }
        }
    },[]);

    useEffect(()=>{
        if(router.isReady){
            if(router.query.source){
                setSourceUrl('/'+router.query.source);
            }
        }
    },[router]);


    const onCheckClick = (e) => {
        if(e.target.checked == true){
          setSourceChecked(true);
        }else{
            setSourceChecked(false);
        }
    }

    const onGmailLogin = (e)=>{
        if(sourceChecked){
          signInWithGoogle()
          .then((result) => {
            if(result?.user){
                localStorage.setItem('user', JSON.stringify(result?.user));
              let ipAddress='';
              let uPref='';
              if(userPreferenceChannelIds?.length>0){
                userPreferenceChannelIds.forEach((channel,index) => {
                  if(index!= userPreferenceChannelIds?.length-1){
                    uPref+=channel+',';
                  }else{
                    uPref+=channel;
                  }
                });
              }
              let obj = {
                consent: "1",
                device: "web",
                first_name: result.user.displayName?.split(' ')[0],
                ip_address: ipAddress,
                last_name: result.user.displayName?.split(' ')[1],
                country: "India",
                login_type: "2",
                preference: uPref,
                profile_image: result.user?.photoURL,
                token: result.user.providerData[0]?.uid,
                user_id: result.user.providerData[0]?.email,
                firebase_uid: result.user?.uid,
              };
              const response = dispatch(takLoginAction(obj));
              response.then(res=>{
                localStorage.loggedInUserId = res?.data?.channel?.user_profile?.user_id;
                // clevertap.onUserLogin.push({
                //   "Site": {
                //     "Name": result.user.displayName,            
                //     "Email": result.user.providerData[0]?.email,  
                //   }
                // });
                // analytics.logEvent('login');

                if(!res?.channel?.isUserNameCreated){
                    router.push({
                        pathname:'/welcome',
                        query:{'userId':res?.data?.channel?.user_profile?.user_id,'name':res?.data?.channel?.user_profile?.fname,'image':result.user?.photoURL}
                    });
                }else{
                    dispatch(getUserProfileAction(res?.data?.channel?.user_profile?.user_id));
                    router.push(sourceUrl);
                }
                dispatch(isLoggedInAction());
              }).catch(err=>{
                console.log(err);
              })
            }
          }).catch((error) => {
            console.log(error);
          });
        }else{
          e.preventDefault();
        }
      }

  return (
    <>
    <Head>
        <title>Login | Tak.Live</title>
        <meta name="description" content="Login at Tak.Live" />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="Login | Tak.Live" />
        <meta property="og:description" content="Login at Tak.Live" />
        <meta property="og:url" content="https://www.tak.live/login" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/login" />
        <meta name="twitter:title" content="Login | Tak.Live" />
        <meta name="twitter:description" content="Login at Tak.Live" />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/login" />
        <meta itemProp="headline" content="Login | Tak.Live" />
        <meta itemProp="description" content="Login at Tak.Live" />
        <link rel="canonical" href="https://www.tak.live/login" />
        <script type='application/ld+json'>
        {
            JSON.stringify(
                {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://www.tak.live","name":"Home"}},{"@type":"ListItem","position":2,"item":{"@id":"https://www.tak.live/login?from=home","name":"Login"}}]}
            )
        }
        </script>
    </Head>
    <section id="login" >
    <div className="container background-color-white minimum-height">
        <Breadcrumb>
        <Breadcrumb.Item href="/">
          <FormattedMessage defaultMessage="Home" id="footer_home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <FormattedMessage
            defaultMessage="Login"
            id="header_login"
          />
        </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
            <div className=" col-12 login-top-content">
                <img src="/assets/images/login-page-icon.png" alt="Login Page" />
                <h1><FormattedMessage defaultMessage={"Welcome to TAK!"} id="login_main_title"></FormattedMessage></h1>
                <h2><FormattedMessage defaultMessage={"Please Sign In"} id="login_secondary_title"></FormattedMessage></h2>
            </div>
            <div className="col-12 login-buttons text-center">
                <div className="login-buttons-gmail" id="gmail-button" onClick={(e)=>onGmailLogin(e)}>
                    <a style={{cursor:sourceChecked?'pointer':'not-allowed'}}><img src="/assets/images/gmail-icon.png" alt="Gmail" /> <FormattedMessage defaultMessage={"Sign In via Google"} id="login_google_sign_in"></FormattedMessage></a>
                </div>
            </div>
            <div className="col-12 login-bottom-text">
                <p className="text-center"><span><input type="checkbox" checked={sourceChecked} onChange={(e)=>onCheckClick(e)} /></span>  
                <FormattedMessage defaultMessage={"By creating this account, I agree to the"} id="login_agree_line_1"></FormattedMessage>
                <a href='/terms-and-conditions' target="_blank" style={{textDecoration: 'underline !important'}}><FormattedMessage defaultMessage={"Terms & Conditions"} id="header_terms_and_conditions"></FormattedMessage></a> 
                <FormattedMessage defaultMessage={"and"} id="login_agree_line_2"> </FormattedMessage> 
                <a href='/privacy-policy' target="_blank" style={{textDecoration: 'underline !important'}}><FormattedMessage defaultMessage={"Privacy Policy"} id="header_privacy_policy"></FormattedMessage></a>
                <FormattedMessage defaultMessage={"of the TAK App."} id="login_agree_line_3"></FormattedMessage>
                </p>
            </div>
        </div>
      
    </div>
</section>
    
    </>
  )
}

export default Login;