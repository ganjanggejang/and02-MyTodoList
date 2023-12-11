module.exports = {
  apps: [
    {
      name: "nestjs-app",
      script: "./dist/main.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true, // 프로세스의 자동 재시작 여부
      watch: false, // 파일의 변경을 감지하고 자동으로 재시작할지 여부
      max_memory_restart: "1G", // 메모리 사용이 일정 수준을 초과하면 프로세스 재시작
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: "SSH_USERNAME",
  //     host: "SSH_HOSTMACHINE",
  //     ref: "origin/master",
  //     repo: "GIT_REPOSITORY",
  //     path: "DESTINATION_PATH",
  //     "pre-deploy-local": "",
  //     "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
  //     "pre-setup": "",
  //   },
  // },
};
