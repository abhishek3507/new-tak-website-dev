import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction,saveUserProfileAction } from '../../store/auth/authAction';
import authSlice from '../../store/auth/authSlice';


const MyProfile = () => {

    const router = useRouter();

    const [userId,setUserId] = useState('');
    const userDetails = useSelector((state)=>state?.auth?.userDetails);
    const [editNotClicked,setEditNotClicked] = useState(true);
    const fullName = useSelector((state)=>state?.auth?.fullName);
    const [eneteredFullName,setEnteredFullName] = useState(fullName);
    const [home, setHome] = useState(false)

    const {actions} = authSlice;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.loggedInUserId){
            setUserId(localStorage.loggedInUserId);
        }else{
            router.push({
                pathname: '/login',
                query: { source: 'my-profile' },
            })
        }
    },[]);

    useEffect(()=>{
        if(userId && userId!==''){
            getUserProfile(userId);
        }
    },[userId]);

    useEffect(()=>{
        setEnteredFullName(fullName);
    },[fullName])

    const getUserProfile=(id)=>{
        dispatch(getUserProfileAction(id))
    }

    const onEditButtonClicked = ()=>{
        setEditNotClicked(false);
      }
    
    const onEditBackClick = ()=>{
        if(editNotClicked){
          router.push('/');
        }else{
            setEditNotClicked(true);
        }
    }
     
    

    const handleKeyDown = (e) => {
        if (!(/[a-z ]/i.test(e.key))) {
            e.preventDefault();
        }
    }

    const onSaveProfile = (event)=>{
        event.preventDefault();
        let obj = {
          "uid": userId,
          "fname": eneteredFullName,
          "email":userDetails?.email,
          "user_name":userDetails?.user_name
        }
        console.log(obj.fname)
        const response = dispatch(saveUserProfileAction(obj));
        response.then(res=>{
            if(res){
                dispatch(getUserProfileAction(obj.uid));
            }
        })
        
        
        // this.authService.saveUserProfile(obj).subscribe(res=>{
        //   if(res?.status == true){
        //     clevertap.event.push('editprofile_save', {
        //       "user_id":this.userDetails?.email,
        //       "user_name":this.userDetails?.user_name,
        //       "user_profile_name":this.userDetails.fname,
        //       "user_email":this.userDetails?.email,
        //       "user_phone":this.userDetails?.mobile,
        //       "device_type":"web"
        //     });
        //     this.analytics.logEvent('editprofile_save', {
        //       "user_id":this.userDetails?.email,
        //       "user_name":this.userDetails?.user_name,
        //       "user_profile_name":this.userDetails.fname,
        //       "user_email":this.userDetails?.email,
        //       "user_phone":this.userDetails?.mobile,
        //       "device_type":"web"
        //     });
        //     window.location.reload();
        //   }
        // },err=>{
        //   console.log(err);
        // })
        router.push('/')
      }

  return (
    <>
    <Head>
        <title>My Profile | Tak.Live</title>
        <meta name="description" content="My Profile – View profile at Tak.Live" />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="My Profile | Tak.Live" />
        <meta property="og:description" content="My Profile – View profile at Tak.Live" />
        <meta property="og:url" content="https://www.tak.live/my-profile" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/my-profile" />
        <meta name="twitter:title" content="My Profile | Tak.Live" />
        <meta name="twitter:description" content="My Profile – View profile at Tak.Live" />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/my-profile" />
        <meta itemProp="headline" content="My Profile | Tak.Live" />
        <meta itemProp="description" content="My Profile – View profile at Tak.Live" />
        <link rel="canonical" href="https://www.tak.live/my-profile" />
        <script type='application/ld+json'>
        {
            JSON.stringify(
                {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://www.tak.live","name":"Home"}},{"@type":"ListItem","position":2,"item":{"@id":"https://www.tak.live/my-profile","name":"My Profile"}}]}
            )
        }
        </script>
    </Head>

<section id="my-profile">
    <div className="container background-color-white minimum-height">
        <Breadcrumb>
        <Breadcrumb.Item href="/">
          <FormattedMessage defaultMessage="Home" id="footer_home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <FormattedMessage
            defaultMessage="My Profile"
            id="header_my_profile"
          />
        </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row">
            <div className="col-12 paddingLeftRight10px">
                <div className="my-profile-top">
                    <div className="top-left" onClick={onEditBackClick}>
                        <button><i className="fa fa-arrow-left"></i></button>
                        
                    </div>
                    
                      
                    
                    {
                        editNotClicked && (
                            <div className="top-middle">
                                <FormattedMessage defaultMessage="My Profile" id="profile_my_profile"></FormattedMessage>
                                <button className="float-right" onClick={onEditButtonClicked}><img src="/assets/images/icons/edit.png" width={20} height={20} alt="edit" /> </button>
                            </div>
                        )
                    }
                    {
                        !editNotClicked && (
                            <div className="top-middle" style={{marginRight: '30px'}}>
                                
                                <FormattedMessage defaultMessage="My Profile" id="profile_my_profile"></FormattedMessage>
                            </div>
                        )
                    }
                   
                </div>
            </div>
            <div className="col-12 col-sm-12 m-auto paddingLeftRight10px">
                <form name="userNameForm" onSubmit={onSaveProfile}>
                    <div className=" mt-2">
                        <div className="profile-pic-box">
                            <div className="profile-avator  mb-4">
                                <img src={userDetails?.profileimage?userDetails?.profileimage:'/assets/images/default-profile.png'} className="img-lg rounded-circle mb-4" alt="Profile Image" onError={(e)=>e.target.src = '/assets/images/default-profile.png'} />
                            </div>
                        </div>
                        <input id="imageUpload" type="file" name="profile_photo" placeholder="Photo" required="" capture hidden />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">
                            <FormattedMessage defaultMessage="Username" id="profile_username"></FormattedMessage>    
                        </label>
                        <input type="text" className="form-control" id="username" disabled value={userDetails?.user_name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">
                            <FormattedMessage defaultMessage="Full Name" id="profile_full_name"></FormattedMessage>    
                        </label>
                        <input type="text" className="form-control" id="name" name="full-name" onKeyPress={(e)=>handleKeyDown(e)} disabled={editNotClicked} value={eneteredFullName} onChange={(e)=>setEnteredFullName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="yourname">
                        <FormattedMessage defaultMessage="Email" id="profile_email"></FormattedMessage>
                        </label>
                        <input type="text" className="form-control" id="emailid" disabled value={userDetails?.email} />
                    </div>
                    <div className="profilesave mb-5">
                        <button type="submit" className="btn mt-3 save-btn" hidden={editNotClicked} >
                        <FormattedMessage defaultMessage="Save" id="profile_save"></FormattedMessage>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</section>
    </>
  )
}

export default MyProfile;