import { Header, Scrollable, Section, Title } from "@/components/common";
import { BottomNavbar } from "@/components/menu";
import { MyMenuItem } from "@/components/my";
import { ROUTE } from "@/shared/config/route";
import { RiBook2Line, RiFilePaper2Line, RiLogoutBoxLine } from "react-icons/ri";
import { BiCommentDetail, BiCommentError } from "react-icons/bi";
import { TbXboxX } from "react-icons/tb";
import { IoCubeOutline, IoNotificationsOutline } from "react-icons/io5";

export default function MyPage() {
  return (
    <>
      <Header
        left={<Title>마이페이지</Title>}
        className="absolute left-0 right-0 top-0 bg-white"
      />

      <Scrollable className="pt-header-height px-gutter gap-3xl">
        <Section className="py-9">
          <div className="gap-3xl pb-lg flex items-center">
            <div className="bg-gray-2 size-20 rounded-full" />
            <div>
              <p className="text-16-semibold text-black">한유진(23)</p>
              <p className="text-14-regular text-gray-4">202311509</p>
            </div>
          </div>

          <div className="gap-md grid grid-cols-3">
            <div className="bg-gray-1 rounded-lg px-2 py-5 text-center">
              <p className="text-13-regular text-gray-4">참여 활동</p>
              <p className="text-18-semibold text-black">12</p>
            </div>
            <div className="bg-gray-1 rounded-lg px-2 py-5 text-center">
              <p className="text-13-regular text-gray-4">작성 글</p>
              <p className="text-18-semibold text-black">12</p>
            </div>
            <div className="bg-gray-1 rounded-lg px-2 py-5 text-center">
              <p className="text-13-regular text-gray-4">작성 댓글</p>
              <p className="text-18-semibold text-black">12</p>
            </div>
          </div>
        </Section>

        <Section title="활동">
          <MyMenuItem
            to={ROUTE.MY_ACTIVITY}
            label="내 활동"
            icon={IoCubeOutline}
          />
          <MyMenuItem
            to={ROUTE.MY_POSTS}
            label="내가 쓴 글"
            icon={RiFilePaper2Line}
          />
          <MyMenuItem
            to={ROUTE.MY_COMMENTS}
            label="내가 쓴 댓글"
            icon={BiCommentDetail}
          />
          <MyMenuItem
            to={ROUTE.MY_LIBRARY}
            label="도서 대여 내역"
            icon={RiBook2Line}
          />
          <MyMenuItem to="#" label="문의하기" icon={BiCommentError} />
        </Section>

        <Section title="설정">
          <MyMenuItem to="#" label="알림 설정" icon={IoNotificationsOutline} />
          <MyMenuItem to="#" label="로그아웃" icon={RiLogoutBoxLine} />
          <MyMenuItem to="#" label="탈퇴하기" icon={TbXboxX} />
        </Section>
      </Scrollable>
      <BottomNavbar />
    </>
  );
}
