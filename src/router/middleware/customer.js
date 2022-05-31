export default function guest({ next, router }) {
    if (!localStorage.getItem('token'))
      return router.push('/login');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    if (userInfo.user_type !== 2)
      return router.push('/'); //надо добавить 404 not found

    return next();
  }