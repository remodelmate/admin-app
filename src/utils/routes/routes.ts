export const ROUTE_MAP = {
  auth: {
    login: '/login',
    signup: '/signup',
    signin: '/signin',
    userDoesNotExist: '/auth-error',
  },
  app: {
    entry: '/',
    dashboard: '/dashboard',
    projects: '/projects',
    projectsDetail: 'projects/:projectId',
    milestoneDetail: ':projectId/milestone/:milestoneId',
    earnings: '/earnings',
    profile: '/profile',
    homeowners: '/homeowners',
  },
}

export const interpolateParams = (
  route: string,
  params: Record<string, string>
) => {
  let interpolatedRoute = route

  Object.keys(params).forEach(key => {
    interpolatedRoute = interpolatedRoute.replace(`:${key}`, params[key])
  })

  return interpolatedRoute
}
