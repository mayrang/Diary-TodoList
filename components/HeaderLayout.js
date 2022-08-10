import { PageHeader, Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';



const HeaderLayout = ({extra, title, subTitle}) => {
    return (
        <PageHeader
            className='site-page-header'
            title={title}
            breadcrumb={
                <Breadcrumb>
                    <Breadcrumb.Item><Link href="/"><a>Diary</a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link href="/todo"><a>Todo</a></Link></Breadcrumb.Item>
                </Breadcrumb>
            }
            extra={extra}
            subTitle={subTitle}
        />
    );
};

HeaderLayout.propTypes = {
    extra: PropTypes.array,
    title: PropTypes.string,
    subTitle: PropTypes.string,
}

export default HeaderLayout;