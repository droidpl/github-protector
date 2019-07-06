export const ISSUE_TEMPLATE =
  `Hi @{owner},

We have applied on your name from the Github protector
webhook the following changes on the {branch} branch in this
repository:

- Require pull requests for merging
- Dismiss stale pull request approvals when new commits are pushed
- Require review from Code Owners
- Restrict who can dismiss pull request reviews (Only {owner} can)
- Require status checks to pass before merging
- Include administrators
- Restrict who can push to matching branches (Only {owner} can)

This is what Github responded to the change:
` +
  '```javascript\n {apiResponse} \n```' +
  `
Cheers.
`;
