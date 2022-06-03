export default function guest({ next, router }) {
    if (!localStorage.getItem('token'))
      return router.push('/login');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    if (userInfo.user_type != 1)
      return router.push('/tasks'); //надо добавить 404 not found

    return next();
  }