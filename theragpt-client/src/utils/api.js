export const apiSignIn = (token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiSignOut = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
    method: 'POST',
  });
};
