import Script from 'next/script';
import React from 'react';

const Clevertap = () => {
    const clevertapAccountId = '5WZ-KRW-ZK6Z';
  return (
    <>
    <Script async strategy="afterInteractive" id="clevertap-script" src={`https: == ${document.location.protocol} ? https://d2r1yp2w7bby2u.cloudfront.net/js/a.js : http://static.clevertap.com/js/a.js`} />
	<Script id="clevertap-analytics" strategy="afterInteractive" 
        dangerouslySetInnerHTML={{ __html:`
        var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[], privacy:[]};
        clevertap.account.push({"id": "${clevertapAccountId}"});
        clevertap.privacy.push({optOut: false}); 
        clevertap.privacy.push({useIP: false});` }}
	/>
    </>
  )
}

export default Clevertap