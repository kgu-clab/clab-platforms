import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="text-center text-sm mt-6">
        <ul className="flex justify-center divide-x font-semibold">
          <li>
            <Link className="px-2" href="">
              이용약관
            </Link>
          </li>
          <li>
            <Link className="px-2" href="">
              개인정보처리방침
            </Link>
          </li>
          <li>
            <Link className="px-2" href="">
              동아리운영규칙
            </Link>
          </li>
        </ul>
        <p className="font-medium text-gray-500">© Kyonggi University C-Lab</p>
      </div>
    </footer>
  );
};

export default Footer;
