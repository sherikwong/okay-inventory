interface Routes {
  path: string;
  children?: Routes[];
}

const routes: Routes[] = [
  {
    path: '',
    children: [
      {
        path: 'deduct'
      }
    ]
  }
]

export default routes;
