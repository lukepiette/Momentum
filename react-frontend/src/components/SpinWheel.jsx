import React from 'react';
import { Spin, Icon } from 'antd';


function AntSpinIcon(){
    return <Icon type="loading" style={{ fontSize: 50, display:"block", margin:"0 auto", marginTop:"20%" }} spin />;
}

export default AntSpinIcon