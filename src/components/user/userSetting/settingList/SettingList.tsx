import SettingItem from '../settingItem/SettingItem';

const SettingList = () => {
  return (
    <div className="mt-5 w-full divide-y px-5">
      <SettingItem
        destination="#"
        title="문의하기"
        description="궁금한 내용이 있으신가요?"
      />

      <SettingItem
        destination="/resetPassword/userPassword"
        title="비밀번호 변경"
        description="비밀번호를 변경하시고 싶으신가요?"
      />

      <SettingItem
        destination="/deleteAccount"
        title="계정 탈퇴"
        description="이제 WE'GO를 사용할 수 없어요."
      />
    </div>
  );
};

export default SettingList;
