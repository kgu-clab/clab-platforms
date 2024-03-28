import classNames from 'classnames';
import { ReactNode } from 'react';

interface SupportIconsProps {
  className?: string;
  children: ReactNode;
}

const SupportIcons = ({ className, children }: SupportIconsProps) => {
  return <div className={classNames('h-10', className)}>{children}</div>;
};

SupportIcons.Check = () => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z" />
  </svg>
);

SupportIcons.Checking = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 203">
    <path d="M84.2 2.3c18.7 0 33.8 15.1 33.8 33.8s-15.1 33.8-33.8 33.8-33.8-15.2-33.8-33.8S65.5 2.3 84.2 2.3zm104.6 149.1c4.3 0 7.8 2.2 7.8 5s-3.5 5-7.8 5-7.8-2.2-7.8-5 3.5-5 7.8-5zm-39.5-39.3-3.9 11.1c-4-8.3-8-16.3-11.1-21.8-3.4-7.2-8.7-13.3-15.3-17.6-6.6-4.3-14.5-6.8-22.9-6.8H44.2C20.9 76.9 2 96 2 119.1V183c0 9.8 7.9 17.7 17.7 17.7h202.7l31.6-88.6H149.3zm66.2 78.8H88.6v-5.7c0-8.8-7.2-16-16-16H33.5v-43.3c0-2.2 1.8-3.9 3.9-3.9s3.9 1.8 3.9 3.9v35.4h31.2c12.4 0 22.6 9.5 23.8 21.7h38.1l21.7-61H240l-24.5 68.9z" />
  </svg>
);

SupportIcons.Document = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.293 1.293A1 1 0 0 1 10 1h8a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a1 1 0 0 1 .293-.707l6-6ZM18 3h-7v5a1 1 0 0 1-1 1H5v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM6.414 7H9V4.414L6.414 7ZM7 13a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" />
  </svg>
);

SupportIcons.Next = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M441.749 240.917 207.082 6.251A21.239 21.239 0 0 0 191.999 0H85.333c-8.619 0-16.427 5.184-19.712 13.163a21.33 21.33 0 0 0 4.629 23.253L289.834 256 70.25 475.584a21.33 21.33 0 0 0-4.629 23.253C68.906 506.816 76.714 512 85.333 512H192a21.24 21.24 0 0 0 15.083-6.251L441.75 271.082c8.34-8.341 8.34-21.823-.001-30.165z" />
  </svg>
);

export default SupportIcons;
