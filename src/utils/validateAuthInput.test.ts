import validate from './validateAuthInput';

describe('validateAuthInput', () => {
  describe('이메일 검증', () => {
    it('올바른 이메일 형식이면 true를 반환한다', () => {
      expect(validate({ name: 'email', value: 'test@example.com' })).toBe(true);
    });

    it('잘못된 이메일 형식이면 false를 반환한다', () => {
      expect(validate({ name: 'email', value: 'invalid-email' })).toBe(false);
      expect(validate({ name: 'email', value: 'test@' })).toBe(false);
      expect(validate({ name: 'email', value: '@example.com' })).toBe(false);
    });
  });

  describe('비밀번호 검증', () => {
    it('영문, 숫자를 포함한 8-15자리면 true를 반환한다', () => {
      expect(validate({ name: 'password', value: 'password123' })).toBe(true);
    });

    it('조건에 맞지 않으면 false를 반환한다', () => {
      expect(validate({ name: 'password', value: 'short1' })).toBe(false); // 8자 미만
      expect(validate({ name: 'password', value: 'onlystring' })).toBe(false); // 숫자 없음
      expect(validate({ name: 'password', value: '12345678' })).toBe(false); // 문자 없음
    });
  });

  describe('비밀번호 확인 검증', () => {
    it('비밀번호와 일치하면 true를 반환한다', () => {
      expect(
        validate({
          name: 'passwordConfirm',
          value: 'password123',
          password: 'password123',
        }),
      ).toBe(true);
    });

    it('비밀번호와 일치하지 않으면 false를 반환한다', () => {
      expect(
        validate({
          name: 'passwordConfirm',
          value: 'password124',
          password: 'password123',
        }),
      ).toBe(false);
    });
  });

  describe('이름 검증', () => {
    it('2-10자 한글이면 true를 반환한다', () => {
      expect(validate({ name: 'name', value: '홍길동' })).toBe(true);
    });

    it('조건에 맞지 않으면 false를 반환한다', () => {
      expect(validate({ name: 'name', value: '홍' })).toBe(false); // 2자 미만
      expect(validate({ name: 'name', value: 'Hong' })).toBe(false); // 영문
    });
  });

  describe('생년월일 검증', () => {
    it('6자리 숫자면 true를 반환한다', () => {
      expect(validate({ name: 'birthDate', value: '990101' })).toBe(true);
    });

    it('6자리가 아니거나 숫자가 아니면 false를 반환한다', () => {
      expect(validate({ name: 'birthDate', value: '9901' })).toBe(false);
      expect(validate({ name: 'birthDate', value: '99010a' })).toBe(false);
    });
  });

  describe('연락처 검증', () => {
    it('올바른 전화번호 형식이면 true를 반환한다', () => {
      expect(validate({ name: 'contact', value: '010-1234-5678' })).toBe(true);
    });

    it('잘못된 형식이면 false를 반환한다', () => {
      expect(validate({ name: 'contact', value: '01012345678' })).toBe(false);
      expect(validate({ name: 'contact', value: '010-12-4567' })).toBe(false);
    });
  });

  describe('이메일 인증코드 검증', () => {
    it('6자리 숫자면 true를 반환한다', () => {
      expect(validate({ name: 'emailCode', value: '123456' })).toBe(true);
    });

    it('6자리가 아니거나 숫자가 아니면 false를 반환한다', () => {
      expect(validate({ name: 'emailCode', value: '12345' })).toBe(false);
      expect(validate({ name: 'emailCode', value: '1234a6' })).toBe(false);
    });
  });
});
