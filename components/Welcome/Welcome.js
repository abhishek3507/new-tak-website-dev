import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getUserProfileAction, submitUserNameAction, suggestedUserNamesAction, validateUserNameAction } from '../../store/auth/authAction';


const Welcome = () => {
    const [displayName,setDisplayName]=useState('');
    const [userId,setUserId]=useState('');
    const [suggestedUserNameList,setSuggestedUserNameList]=useState([]);
    const [selectedUserName,setSelectedUserName]=useState('');
    const [showUserNameInvalid,setShowUserNameInvalid]=useState(true);
    const [fullName,setFullName]=useState('');
    const [imageSrc,setImageSrc]=useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(router.isReady){
            router.query.name && setDisplayName(router.query.name);
            router.query.userId && setUserId(router.query.userId);
            router.query.image && setImageSrc(router.query.image);
        }
    },[]);

    useEffect(()=>{
        if(router.isReady){
            router.query.name && setDisplayName(router.query.name);
            router.query.userId && setUserId(router.query.userId);
            router.query.image && setImageSrc(router.query.image);
        }
    },[router]);

    useEffect(()=>{
        setFullName(displayName);
        getSuggestedUserNames();
    },[displayName,userId]);

    useEffect(() => {
        setSelectedUserName(suggestedUserNameList.length>0?suggestedUserNameList[0]:'');
    }, [suggestedUserNameList])
    

    useEffect(()=>{
        setShowUserNameInvalid(false);
    },[selectedUserName]);

    const getSuggestedUserNames = async () => {
       const list = await dispatch(suggestedUserNamesAction(userId,displayName));
       if(list){
        setSuggestedUserNameList(list);
       }
    }

    const onUsernameInputChange = (e) => {
        if(e.target.value.length >= 1){
           setSelectedUserName(e.target.value); 
            validateUserName(e.target.value);
        }else{
            setSelectedUserName(e.target.value); 
            setShowUserNameInvalid(true);
        }
    }

    const validateUserName = (userNameEntered) => {
        const res = dispatch(validateUserNameAction(userId,userNameEntered));
        if(res.status == true){
            setShowUserNameInvalid(false);
        }else{
            setShowUserNameInvalid(true);
        }
    }
    
    const onSuggestedUserNameClick = (e) => {
        setSelectedUserName(e.target.textContent);
        setShowUserNameInvalid(false);
    }

    const handleKeyDown = (e) => {
        if (!(/[a-z ]/i.test(e.key))) {
            e.preventDefault();
        }
    }

    const onUserNameFormSubmit = (e) => {
        e.preventDefault();
        let formData = {
            "uid": userId,
            "fname": fullName?.length>0?fullName:displayName,
            "user_name": selectedUserName
        }
        const res = dispatch(submitUserNameAction(formData));
        if(res){
            dispatch(getUserProfileAction(userId));
            router.push('/');
        }
    }

  return (
    <>
        <section id="login">
    <div className="container background-color-white minimum-height">
        <div className="row">
            <div className=" col-12 paddingLeftRight10px login-top-content mt-2">
                <img src="/assets/images/login-page-icon.png" alt="Icon" />
            </div>
            <div className="col-12 paddingLeftRight10px login-buttons mt-4 mb-3">
                <h1><FormattedMessage defaultMessage="Welcome!" id="profile_welcome" /></h1>
                <p><FormattedMessage defaultMessage="To begin, please enter your username." id="profile_welcome_start" /></p>
            </div>
            <div className="col-12 col-sm-10 m-auto paddingLeftRight10px">
                <form name="userNameForm" onSubmit={(e)=>onUserNameFormSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="username"><FormattedMessage defaultMessage="Username" id="profile_username" /></label>
                        <input type="text" className="form-control" id="username" name="username" 
                         required onChange={(e)=>onUsernameInputChange(e)} value={selectedUserName} />
                         {
                            showUserNameInvalid || selectedUserName?.length==0 ? (
                                <div className="errorsms"><FormattedMessage defaultMessage="Username not available!" id="profile_user_name_not_available" /> </div>
                            ) : showUserNameInvalid ? (
                                <span className="crossIcon"> <i className="fa fa-times" aria-hidden="true"></i> </span>
                            ) : !showUserNameInvalid ? (
                                <span className="CheckIcon"> <i className="fa fa-check" aria-hidden="true"></i> </span>
                            ) : (
                                ''
                            )
                         }   
                        <div>
                            {
                                suggestedUserNameList?.length>0 && (
                                    <div className='userNameDiv'>
                                        {
                                            suggestedUserNameList.map((userName,index) => (
                                                <span className="userNameSug" key={index}  onClick={(e)=>onSuggestedUserNameClick(e)}>{userName}</span>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                        
                    </div>
                    {
                        suggestedUserNameList?.length>0 && (
                            <>
                            <br/><br/>
                            </>
                        )
                    }
                    <div className="clearboth"></div>
                    <div className="form-group">
                        <label htmlFor="yourname"><FormattedMessage defaultMessage="Full Name" id="profile_full_name" /></label>
                        <input type="text" className="form-control" name="fullname" onKeyPress={(e)=>handleKeyDown(e)} placeholder={<FormattedMessage defaultMessage="Full Name" id="profile_full_name" />} id="yourName" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                    </div>
                    <div className="btnmain">
                        <button type="submit" className="btn btnclassName save-btn" disabled={showUserNameInvalid}><FormattedMessage defaultMessage="Continue" id="profile_welcome_continue" /></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Welcome;