import Image from 'next/image';
import * as React from 'react';

export default function Nav() {
  return (
    <div className="nav">
      <Image
        src="/images/logos/jung-gpt-logo.webp"
        width={84}
        height={84}
        alt=""
        className="nav-logo"
      />
    </div>
  );
}
