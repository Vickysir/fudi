import React, { useState, useEffect } from 'react'
import SkinlTwo from '@/styles/theme/two.less';
import SkinlOne from '@/styles/theme/one.less';
import { withRouter } from 'react-router-dom';


const ThemeComp = (props) => {
    // const [skin, setskin] = useState(SkinlOne)
    useEffect(() => {
        // console.log('props', props)
        const { location } = props;
        const pathArry = location?.hash.split("/");
        // console.log('pathArry', pathArry);

        // setskin(selectSkin(pathArry[1]));

    })
    const selectSkin = (type) => {
        switch (type) {
            case 'fudi':
                return SkinlOne
                break;
            case 'others':
                return SkinlTwo
                break;
            default:
                return SkinlOne
        }
    }
    return (
        <div>
            {props.children}
            {/* <style dangerouslySetInnerHTML={{ __html: SkinlOne }} /> */}
        </div>
    )
}

export default withRouter(ThemeComp)
