'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CHANNEL_TALK_TOKEN } from '@/constants';

import ChannelService from './ChannelService';

interface ChannelTalkContextType {
  channelTalk: ChannelService | null;
  setChannelTalk: React.Dispatch<React.SetStateAction<ChannelService | null>>;
}

const ChannelTalkContext = createContext<ChannelTalkContextType | undefined>(
  undefined,
);

export const ChannelTalkProvider = ({ children }: { children: ReactNode }) => {
  const [channelTalk, setChannelTalk] = useState<ChannelService | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newChannelTalk = new ChannelService();
      setChannelTalk(newChannelTalk);

      newChannelTalk.boot({
        pluginKey: CHANNEL_TALK_TOKEN || '',
      });

      return () => {
        newChannelTalk.shutdown();
      };
    }
  }, []);

  return (
    <ChannelTalkContext.Provider value={{ channelTalk, setChannelTalk }}>
      {children}
    </ChannelTalkContext.Provider>
  );
};

export const useChannelTalk = (): ChannelTalkContextType => {
  const context = useContext(ChannelTalkContext);
  if (!context) {
    throw new Error('ChannelTalkProvider가 존재하지 않아요.');
  }
  return context;
};
