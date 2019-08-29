//node ./cypress/integration/isolation-others/answer.parallel-run.js
const childProcess = require('child_process')

const SERVICELIST = [
  { service: 'answer.one_item.spec.js' },
  { service: 'answer.two_item.spec.js' }
]

for (let i = 0; i < 3; i++) {
  SERVICELIST.forEach(({ service }) => {
    const child = childProcess.spawn('npx', [
      'cypress',
      'run',
      '--env',
      'configFile="beta"',
      '--spec',
      `./cypress/integration/isolation-others/${service}`
    ])
    child.stdout.on('data', d => console.log(d.toString()))
    child.stderr.on('data', d => console.log(d.toString()))
  })
}
