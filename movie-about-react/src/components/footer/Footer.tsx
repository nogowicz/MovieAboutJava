import React, { CSSProperties } from 'react';

type FooterProps = {
    isAbsolute?: boolean;
}

export default function Footer({ isAbsolute = false }: FooterProps) {
    return <footer style={
        isAbsolute ? absoluteFooterStyle : footerStyle}>
        &copy; Bartek Noga
    </footer>
}

const footerStyle: CSSProperties = {
    fontSize: '15px',
    fontWeight: 300,
    color: 'white',
    backgroundColor: '#202020',
    borderTop: '1px solid',
    paddingTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
    marginBottom: -10,
    marginTop: 10,
    paddingLeft: 20,
};

const absoluteFooterStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    bottom: 0,
};