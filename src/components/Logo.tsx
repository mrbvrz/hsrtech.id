/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
// Path to logo image. We refer to it by a string path so that if the file does not exist,
// the build does not fail. At runtime, the browser will attempt to load the image,
// and if it fails (404), the onError handler will gracefully fall back to our styled vector logo.
const logoImg = '/src/assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export default function Logo({ className = '', size = 'md', variant = 'default' }: LogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  // Sizing proportions
  const containerHeight = isSm ? 'h-8' : isLg ? 'h-16' : 'h-12';
  const hsrTextSize = isSm ? 'text-xl' : isLg ? 'text-4xl' : 'text-3xl';
  const techTextSize = isSm ? 'text-[7px] tracking-[0.2em]' : isLg ? 'text-[12px] tracking-[0.3em]' : 'text-[10.5px] tracking-[0.24em]';

  const [imgError, setImgError] = useState(false);
  const isWhite = variant === 'white';

  // If the PNG exists and isn't our 1x1 blank placeholder, we display it.
  // We can let the user swap it.
  return (
    <div 
      className={`flex items-center justify-start font-display select-none ${containerHeight} ${className}`}
    >
      {!imgError ? (
        <img 
          src={logoImg} 
          alt="HSR Nexus Logo" 
          className={`h-full w-auto object-contain ${isWhite ? 'brightness-0 invert' : ''}`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex flex-col leading-none">
          <div className={`flex items-baseline font-extrabold tracking-tight ${isWhite ? 'text-white' : 'text-brand-dark'}`}>
            <span className={hsrTextSize}>H</span>
            <span className={`relative ${hsrTextSize}`}>
              S
              <svg 
                className={`absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-100 hidden md:block ${isWhite ? 'text-white' : 'text-brand-dark'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M2,12 Q12,12 22,6" strokeLinecap="round" />
              </svg>
            </span>
            <span className={`ml-0.5 ${hsrTextSize}`}>R</span>
          </div>
          <span className={`font-semibold uppercase mt-0.5 ${techTextSize} ${isWhite ? 'text-slate-300' : 'text-brand-blue'}`}>
            Technology
          </span>
        </div>
      )}
    </div>
  );
}
