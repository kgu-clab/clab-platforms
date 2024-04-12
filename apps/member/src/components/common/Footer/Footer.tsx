import { Link } from 'react-router-dom';

const list = [
  {
    name: '이용약관',
    path: '/terms',
  },
  {
    name: '개인정보처리방침',
    path: '/privacy',
  },
  {
    name: '동아리운영규칙',
    path: '/rules',
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-white p-10 text-center">
      <ul className="flex justify-center divide-x text-sm font-semibold">
        {list.map(({ name }) => (
          <Link key={name} className="px-2" to="">
            {name}
          </Link>
        ))}
      </ul>
      <div className="mt-2 text-xs font-medium text-gray-400">
        <p>Developed By C-Lab Core Team</p>
        <p>© C-Lab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
