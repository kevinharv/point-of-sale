declare interface System {
    server_hostname: String
    server_uptime?: number
    server_arch?: String
    server_os?: String
    server_os_release?: String
    server_cpu?: String
    server_memory?: number
    server_availableMem?: number
    server_NICs?: String
    dns_servers?: String
    postgres_version?: String
}

declare interface User {
    userID?: Number
    username: String
    userPIN?: Number
    displayName: String
    firstName: String
    middleName?: String
    lastName: String
    birthdate?: String
    address?: String
    email: String
    clockStatus?: Boolean
    lastClockIn?: String
    lastClockOut?: String
    roles?: Object
    permissions?: Object
}

declare interface QueryConfig {
    text: string;
    values?: Array<any>;
    name?: string;
    rowMode?: string;
}