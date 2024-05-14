import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Stack } from 'react-bootstrap';
function CalendarLoading(){

    return(
    <div>
        <header className='h-400'>
        </header>
        <body className='text-center'>
            <Stack>
            <Spin 
            className='color-violet'
            indicator={
                <LoadingOutlined
                    style={{fontSize: 72,}}
                    spin/>}
            />
            <p className='color-darkBlue m-top-20'>Loading...</p>
        </Stack>
        </body>
        <footer className='h-200'>

        </footer>
     </div>
    )
}

export default CalendarLoading