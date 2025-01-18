'use client';

import { useChannelTalk } from '@/utils/ChannelTalkContext';
import Link from 'next/link';

export default function ContactInfoSection() {
  const { channelTalk } = useChannelTalk();

  const handleChatOpen = () => {
    if (channelTalk) {
      channelTalk.openChat();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <p>10:00 ~ 20:00 (평일)</p>
      <p>
        오픈 채팅 :{' '}
        <Link
          target="_blank"
          scroll={false}
          href="https://open.kakao.com/o/gJWcoM6d"
          className="text-clab-yellow underline-offset-4 hover:underline"
        >
          카카오톡
        </Link>
      </p>
      <p>
        라이브챗 :{' '}
        <span
          onClick={handleChatOpen}
          className="text-clab-blue cursor-pointer underline-offset-4 hover:underline"
        >
          채널톡
        </span>
      </p>
      <p>
        서비스문의 :{' '}
        <Link
          scroll={false}
          href="mailto:clab.coreteam@gmail.com"
          className="text-clab-light-blue underline-offset-4 hover:underline"
        >
          clab.coreteam@gmail.com
        </Link>
      </p>
    </div>
  );
}
