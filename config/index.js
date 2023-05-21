
const config = {
    branch: 'production',
    repositoryUrl: 'Automattic/vip-go-skeleton',
    vipDirectory: '.local/share/vip/dev-environment',
    authConfigFileName: 'auth-env.json',
    defaultProjectName: 'next-wp',
    redirectDomain: 'xyz.com',
    php_version:8.0,
    wp_version:'6.1.1',
    appDirectory:'vcli',
    docker_file_name:'.lando.yml',
    vip_config_path: './../config/vip-config' // references with scr folder
}
export default config