import Image from 'next/image';
import * as React from 'react';

export default function Nav() {
  return (
    <div className="nav">
      <Image
        fill
        src="/images/logos/jung-gpt-logo.webp"
        alt=""
        className="nav-logo"
      />
    </div>
  );
}
