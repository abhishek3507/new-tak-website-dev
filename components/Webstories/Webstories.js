import React from 'react'

const Webstories = () => {
    return (
        <section id="web-stories">
            <div className="paddingTopBottom10px minimum-height container margin-top-75px background-color-white">
                <div className="row">
                    <div className="col-12 paddingLeftRight10px">
                        <iframe src="https://www.tak.live/webstory" width="100%" frameBorder="0" style={{minHeight:'80vh'}}>
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Webstories;