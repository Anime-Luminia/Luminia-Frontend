import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { api } from '../api/axios';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!agreed) {
      setErrorMessage('약관에 동의해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await api.post('/api/user/register', {
        email: `${email}@${selectedDomain}`,
        password: password,
        nickName: username,
      });

      setSuccessMessage('회원가입 성공! 로그인 페이지로 이동합니다.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleEmailAuth = () => {
    // 이메일 인증 처리 로직
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <Link to='/'>
          <h1 className='text-4xl font-bold text-accent text-center mb-6'>
            Luminia
          </h1>
        </Link>
        <h2 className='text-xl text-center text-gray-700 mb-6'>계정 만들기</h2>

        {errorMessage && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className='space-y-5'>
          <div className='relative'>
            <FaUserAlt className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='유저 이름'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
            />
          </div>

          <div className='relative'>
            <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <div className='flex space-x-2 items-center'>
              <input
                type='text'
                placeholder='이메일'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-10 p-3 w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
              />
              <span>@</span>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className='p-3 w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
              >
                <option value=''>도메인 선택</option>
                <option value='gmail.com'>gmail.com</option>
                <option value='naver.com'>naver.com</option>
                <option value='daum.net'>daum.net</option>
              </select>
            </div>
          </div>

          <button
            type='button'
            onClick={handleEmailAuth}
            className='w-full bg-accent text-white py-2 rounded-lg hover:bg-hover transition duration-200 font-semibold'
          >
            이메일 인증하기
          </button>

          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
            />
          </div>

          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='password'
              placeholder='비밀번호 확인'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className='h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded'
            />
            <label className='text-sm text-gray-600'>
              <Link to='/terms' className='text-accent underline'>
                약관
              </Link>
              에 동의합니다.
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-accent text-white py-3 rounded-lg hover:bg-hover transition duration-200 font-semibold'
          >
            회원가입
          </button>
        </form>

        <p className='mt-6 text-center text-gray-600'>
          이미 회원이신가요?{' '}
          <Link to='/login' className='text-accent hover:underline'>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
