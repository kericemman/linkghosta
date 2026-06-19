module.exports = {
  apps: [
    {
      name: "linkghosta-api",
      script: "server.js",
      cwd: "./backend",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
