import Head from 'next/head';
import React from 'react'

const HomeHeadTag = (props) => {
    
  const updateMetaTitleAndDescription = (url)=>{
        let metaObject={
            title:'',
            description:''
        }
        switch (url) {
          case 'elections':
            metaObject.title='Assembly Elections Result 2022: Uttar Pradesh, Punjab, Manipur, Uttarakhand and Goa Election Results Live Updates';
            metaObject.description='Assembly Elections Result 2022 - Watch assembly election results live updates for Uttar Pradesh, Punjab, Uttarakhand, Manipur and Goa on Tak.';
            break;
    
          case 'news-tak':
            metaObject.title='Latest News Videos, News Videos Clips, Watch News Videos Online | News Tak';
            metaObject.description='Watch latest breaking news videos. Stay updated with national & international news video clips online with News Tak.';
            break;
    
          case 'sports-tak':
            metaObject.title='Latest Sports News Videos, Sports Videos Clips, Watch Sports Videos | Sports Tak';
            metaObject.description='Watch latest sports news videos, sports videos clips and much more on Sports Tak.';
            break;
    
          case 'crime-tak':
            metaObject.title='Crime News Videos, Latest Crime News Headlines Video Clips | Crime Tak';
            metaObject.description='Watch latest crime news video, crime news clips, criminal & cyber cases short video and much more with Crime Tak.';
            break;
    
          case 'biz-tak':
            metaObject.title='Latest Business News Videos, Business Videos Clips, Watch Business Videos | Biz Tak';
            metaObject.description='Watch latest business news videos, business videos clips, stock market news videos and business video stories on Biz Tak.';
            break;
    
          case 'life-tak':
            metaObject.title='Lifestyle Videos, Lifestyle Videos News, Lifestyle Videos Clips | Life Tak';
            metaObject.description='Lifestyle Videos: Watch latest lifestyle news videos, lifestyle videos clips and trending lifestyle video stories on Life Tak.';
            break;
    
          case 'fit-tak':
            metaObject.title='Fitness Videos, Fitness Videos News, Fitness Videos Clips | Fit Tak';
            metaObject.description='Fitness Videos: Watch latest tips and news on Fitness Videos on Fit Tak. Here you will find all the video & clips related to fitness, health and yoga.';
            break;
    
          case 'bharat-tak':
            metaObject.title='Bharat News Videos, Watch India Short Video News Online | Bharat Tak';
            metaObject.description='Bharat Latest News Videos - Watch trending India Videos Online Today and stay updated at Bharat Tak.';
            break;
    
          case 'up-tak':
            metaObject.title='UP News Videos, Watch Uttar Pradesh Short Video News Online | UP Tak';
            metaObject.description='UP Latest News Videos - Watch trending UP Videos Online Today and stay updated at UP Tak.';
            break;
    
          case 'bihar-tak':
            metaObject.title='Bihar News Videos, Watch Bihar Short Video News Online | Bihar Tak';
            metaObject.description='Bihar Latest News Videos - Watch trending Bihar Videos Online Today and stay updated at Bihar Tak.';
            break;
    
          case 'mumbai-tak':
            metaObject.title='Mumbai News Videos, Watch Mumbai Short Video News Online | Mumbai Tak';
            metaObject.description='Mumbai Latest News Videos - Watch trending Mumbai Videos Online Today and stay updated at Mumbai Tak.';
            break;
    
          case 'mp-tak':
            metaObject.title='MP News Videos, Watch Madhya Pradesh Short Video News Online | MP Tak';
            metaObject.description='MP Latest News Videos - Watch trending Madhya Pradesh Videos Online Today and stay updated at MP Tak.';
            break;
    
          case 'dilli-tak':
            metaObject.title='Delhi News Videos, Watch Delhi Short Video News Online | Dilli Tak';
            metaObject.description='Delhi Latest News Videos - Watch trending Delhi Videos Online Today and stay updated at Dilli Tak.';
            break;
    
          case 'rajasthan-tak':
            metaObject.title='Rajasthan News Videos, Watch Rajasthan Short Video News Online | Rajasthan Tak';
            metaObject.description='Rajasthan Latest News Videos - Watch trending Rajasthan Videos Online Today and stay updated at Rajasthan Tak.';
            break;
    
          case 'gujarat-tak':
            metaObject.title='Gujarat News Videos, Watch Gujarat Short Video News Online | Gujarat Tak';
            metaObject.description='Gujarat Latest News Videos - Watch trending Gujarat Videos Online Today and stay updated at Gujarat Tak.';
            break;
    
          case 'punjab-tak':
            metaObject.title='Punjab News Videos, Watch Punjab Short Video News Online | Punjab Tak';
            metaObject.description='Punjab Latest News Videos - Watch trending Punjab Videos Online Today and stay updated at Punjab Tak.';
            break;
    
          case 'haryana-tak':
            metaObject.title='Haryana News Videos, Watch Haryana Short Video News Online | Haryana Tak';
            metaObject.description='Haryana Latest News Videos - Watch trending Haryana Videos Online Today and stay updated at Haryana Tak.';
            break;
    
          case 'uttarakhand-tak':
            metaObject.title='Uttarakhand News Videos, Watch Uttarakhand Short Video News Online | Uttarakhand Tak';
            metaObject.description='Uttarakhand Latest News Videos - Watch trending Uttarakhand Videos Online Today and stay updated at Uttarakhand Tak.';
            break;
    
          case 'astro-tak':
            metaObject.title='Astrology Videos, Watch Daily Horoscope, Panchang and Mantra Videos | Astro Tak';
            metaObject.description='Astrology Videos: Latest Astrology News Videos, Watch Daily Panchang, Mantras, Slokas, Puja Vidhi videos and many more on Astro Tak.';
            break;
    
          case 'sahitya-tak':
            metaObject.title='Sahitya Videos, Watch Hindi Sahitya Short Video News Online | Sahitya Tak';
            metaObject.description='Sahitya Videos: Latest Sahitya Videos, Watch Hindi Sahitya Short Video News and many more on Sahitya Tak.';
            break;
    
          case 'social-news':
            metaObject.title='Social News Videos, Watch Social Short Video News Online | Tak.Live';
            metaObject.description='Social News Videos - Watch Social Videos Online Today and stay updated at Tak.Live.';
            break;
    
          case 'discover':
            metaObject.title='Discover News Videos, Discover Short Video News Online | Tak.Live';
            metaObject.description='Discover Shorts - Discover short news on sports, politics, crime, fitness, life, entertainment and many more at Tak.Live.';
            break;
    
          case 'spotlight/anchor/all':
            metaObject.title='Tak Anchor, Tak News Anchor, News Anchor Tak | Tak.Live';
            metaObject.description='Tak Anchors – Ajit Singh, Anuradha Tanwar, Rohit Kaushik, Rishi Raj, Mansi Kumari, Rakshita Misra, Kirti Rajora, Aayush Mishra, VARNITA VAJPAYEE, Shreya Bahuguna, Rashika and more.';
            break;
    
          case 'login':
            metaObject.title='Login | Tak.Live';
            metaObject.description='Login at Tak.Live';
            break;
    
          case 'welcome':
            metaObject.title='Welcome | Tak.Live';
            metaObject.description='Welcome to Tak, one-stop spot for the trending news videos, entertainment and viral stories.';
            break;
    
          case 'my-profile':
            metaObject.title='My Profile | Tak.Live';
            metaObject.description='My Profile – View profile at Tak.Live';
            break;
    
          case 'preferences':
            metaObject.title='Preferences | Tak.Live';
            metaObject.description='Select your preferences like news, sports, crime, business, entertainment, fitness and regional news of your choice | Tak.Live';
            break;
    
          case 'navigation-language':
            metaObject.title='Navigation Language | Tak.Live';
            metaObject.description='Select your Navigation Language of your choice in English, हिंदी, मराठी, ਪੰਜਾਬੀ, ગુજરાતી | Tak.Live';
            break;
    
          case 'about-us':
            metaObject.title='About Us | Tak.Live';
            metaObject.description='About Us - Tak is one-stop spot for the quickest, trending news videos, entertainment and viral stories from across India and beyond.';
            break;
    
          case 'contact-us':
            metaObject.title='Contact Us| Tak.Live';
            metaObject.description='Contact Us - Contact for viral stories at Tak.Live.';
            break;
    
          case 'privacy-policy':
            metaObject.title='Privacy Policy | Tak.Live';
            metaObject.description='Read all the Privacy Policy of India Today Group.';
            break;
    
          case 'terms-and-conditions':
            metaObject.title='Terms & Conditions | Tak.Live';
            metaObject.description='Read all the terms & Condition of India Today Group.';
            break;
        
          default:
            metaObject.title='Tak Live: Short Video News, Latest News Streaming, Watch Breaking News';
            metaObject.description='Watch latest breaking news on sports, politics, crime, fitness, sahitya, entertainment and regional videos online with Tak.Live.';
            break;
        }
    
        return metaObject;
      }


  return (
    <Head>
        <title>{updateMetaTitleAndDescription(props.sefUrl).title}</title>
        <meta name="description" content={updateMetaTitleAndDescription(props.sefUrl).description} />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content={updateMetaTitleAndDescription(props.sefUrl).title} />
        <meta property="og:description" content={updateMetaTitleAndDescription(props.sefUrl).description} />
        <meta property="og:url" content={props.url} />
        <meta property="og:image" content='https://www.tak.live/assets/images/header-logo.png' />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content={props.url} />
        <meta name="twitter:title" content={updateMetaTitleAndDescription(props.sefUrl).title} />
        <meta name="twitter:description" content={updateMetaTitleAndDescription(props.sefUrl).description} />
        <meta name="twitter:image" content='https://www.tak.live/assets/images/header-logo.png' />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content={props.url} />
        <meta itemProp="headline" content={updateMetaTitleAndDescription(props.sefUrl).title} />
        <meta itemProp="description" content={updateMetaTitleAndDescription(props.sefUrl).description} />
        <link rel="canonical" href={props.url} />
    </Head>
  )
}

export default HomeHeadTag;