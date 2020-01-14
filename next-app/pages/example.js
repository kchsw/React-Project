import React from 'react';
import Link from 'next/link'

const Example = () => (
    <>
        <h1 className="example">Example Page</h1>
        <Link href="/index">
            <a>idnex</a>
        </Link>
        <Link href="/about?id=1">
            <a>about</a>
        </Link>
        <style jsx>{`
            .example{
                text-align: center;
            }
        `}</style>
    </>
)
export default Example