import FormHeader from '@/components/common/formheader/FormHeader';
import EditForm from '@/components/editProfile/EditForm';

const EditProfile = () => {
  return (
    <div>
      <FormHeader title="프로필 수정" isConfigButton />

      <EditForm />
    </div>
  );
};

export default EditProfile;
