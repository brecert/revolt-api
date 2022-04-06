// This file was generated with https://github.com/brecert/revolt-api-gen

import * as schema from './schema.ts'

export type Responses = Record<string, unknown | never | { content: Record<string, unknown> }>
export type MapResponses<T extends Responses, R = T[keyof T]> = R[keyof R]

export interface TypedResponse<T extends Record<string, unknown> = Record<string, unknown>> extends Response {
  json<P = T['application/json']>(): Promise<P>
}

export interface ExtendedRequestInit extends RequestInit {
  query: Record<string, string | number | boolean>
}

export type Route = { name: string, method: string, path: string, query: unknown, response: unknown }

export type APIRoutes =
  | { name: "Query Node", method: 'get', path: `/`, query: never, response: MapResponses<schema.paths['/']['get']['responses']> }
  | { name: "Fetch Self", method: 'get', path: `/users/@me`, query: never, response: MapResponses<schema.paths['/users/@me']['get']['responses']> }
  | { name: "Edit User", method: 'patch', path: `/users/@me`, query: never, response: MapResponses<schema.paths['/users/@me']['patch']['responses']> }
  | { name: "Fetch User", method: 'get', path: `/users/${string}`, query: never, response: MapResponses<schema.paths['/users/{target}']['get']['responses']> }
  | { name: "Change Username", method: 'patch', path: `/users/@me/username`, query: never, response: MapResponses<schema.paths['/users/@me/username']['patch']['responses']> }
  | { name: "Fetch Default Avatar", method: 'get', path: `/users/${string}/default_avatar`, query: never, response: MapResponses<schema.paths['/users/{target}/default_avatar']['get']['responses']> }
  | { name: "Fetch User Profile", method: 'get', path: `/users/${string}/profile`, query: never, response: MapResponses<schema.paths['/users/{target}/profile']['get']['responses']> }
  | { name: "Fetch Direct Message Channels", method: 'get', path: `/users/dms`, query: never, response: MapResponses<schema.paths['/users/dms']['get']['responses']> }
  | { name: "Open Direct Message", method: 'get', path: `/users/${string}/dm`, query: never, response: MapResponses<schema.paths['/users/{target}/dm']['get']['responses']> }
  | { name: "Fetch Mutual Friends And Servers", method: 'get', path: `/users/${string}/mutual`, query: never, response: MapResponses<schema.paths['/users/{target}/mutual']['get']['responses']> }
  | { name: "Send Friend Request / Accept Request", method: 'put', path: `/users/${string}/friend`, query: never, response: MapResponses<schema.paths['/users/{username}/friend']['put']['responses']> }
  | { name: "Deny Friend Request / Remove Friend", method: 'delete', path: `/users/${string}/friend`, query: never, response: MapResponses<schema.paths['/users/{target}/friend']['delete']['responses']> }
  | { name: "Block User", method: 'put', path: `/users/${string}/block`, query: never, response: MapResponses<schema.paths['/users/{target}/block']['put']['responses']> }
  | { name: "Unblock User", method: 'delete', path: `/users/${string}/block`, query: never, response: MapResponses<schema.paths['/users/{target}/block']['delete']['responses']> }
  | { name: "Create Bot", method: 'post', path: `/bots/create`, query: never, response: MapResponses<schema.paths['/bots/create']['post']['responses']> }
  | { name: "Fetch Public Bot", method: 'get', path: `/bots/${string}/invite`, query: never, response: MapResponses<schema.paths['/bots/{target}/invite']['get']['responses']> }
  | { name: "Invite Bot", method: 'post', path: `/bots/${string}/invite`, query: never, response: MapResponses<schema.paths['/bots/{target}/invite']['post']['responses']> }
  | { name: "Fetch Bot", method: 'get', path: `/bots/${string}`, query: never, response: MapResponses<schema.paths['/bots/{target}']['get']['responses']> }
  | { name: "Delete Bot", method: 'delete', path: `/bots/${string}`, query: never, response: MapResponses<schema.paths['/bots/{target}']['delete']['responses']> }
  | { name: "Edit Bot", method: 'patch', path: `/bots/${string}`, query: never, response: MapResponses<schema.paths['/bots/{target}']['patch']['responses']> }
  | { name: "Fetch Owned Bots", method: 'get', path: `/bots/@me`, query: never, response: MapResponses<schema.paths['/bots/@me']['get']['responses']> }
  | { name: "Acknowledge Message", method: 'put', path: `/channels/${string}/ack/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/ack/{message}']['put']['responses']> }
  | { name: "Fetch Channel", method: 'get', path: `/channels/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}']['get']['responses']> }
  | { name: "Close Channel", method: 'delete', path: `/channels/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}']['delete']['responses']> }
  | { name: "Edit Channel", method: 'patch', path: `/channels/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}']['patch']['responses']> }
  | { name: "Fetch Group Members", method: 'get', path: `/channels/${string}/members`, query: never, response: MapResponses<schema.paths['/channels/{target}/members']['get']['responses']> }
  | { name: "Create Invite", method: 'post', path: `/channels/${string}/invites`, query: never, response: MapResponses<schema.paths['/channels/{target}/invites']['post']['responses']> }
  | { name: "Fetch Messages", method: 'get', path: `/channels/${string}/messages`, query: schema.operations['message_query_req']['parameters']['query'], response: MapResponses<schema.paths['/channels/{target}/messages']['get']['responses']> }
  | { name: "Send Message", method: 'post', path: `/channels/${string}/messages`, query: never, response: MapResponses<schema.paths['/channels/{target}/messages']['post']['responses']> }
  | { name: "Search for Messages", method: 'post', path: `/channels/${string}/search`, query: never, response: MapResponses<schema.paths['/channels/{target}/search']['post']['responses']> }
  | { name: "Poll Message Changes", method: 'post', path: `/channels/${string}/messages/stale`, query: never, response: MapResponses<schema.paths['/channels/{_target}/messages/stale']['post']['responses']> }
  | { name: "Fetch Message", method: 'get', path: `/channels/${string}/messages/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/messages/{msg}']['get']['responses']> }
  | { name: "Delete Message", method: 'delete', path: `/channels/${string}/messages/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/messages/{msg}']['delete']['responses']> }
  | { name: "Edit Message", method: 'patch', path: `/channels/${string}/messages/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/messages/{msg}']['patch']['responses']> }
  | { name: "Create Group", method: 'post', path: `/channels/create`, query: never, response: MapResponses<schema.paths['/channels/create']['post']['responses']> }
  | { name: "Add Member to Group", method: 'put', path: `/channels/${string}/recipients/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/recipients/{member}']['put']['responses']> }
  | { name: "Remove Member from Group", method: 'delete', path: `/channels/${string}/recipients/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/recipients/{member}']['delete']['responses']> }
  | { name: "Join Call", method: 'post', path: `/channels/${string}/join_call`, query: never, response: MapResponses<schema.paths['/channels/{_target}/join_call']['post']['responses']> }
  | { name: "Set Role Permission", method: 'put', path: `/channels/${string}/permissions/${string}`, query: never, response: MapResponses<schema.paths['/channels/{target}/permissions/{role_id}']['put']['responses']> }
  | { name: "Set Default Permission", method: 'put', path: `/channels/${string}/permissions/default`, query: never, response: MapResponses<schema.paths['/channels/{target}/permissions/default']['put']['responses']> }
  | { name: "Create Server", method: 'post', path: `/servers/create`, query: never, response: MapResponses<schema.paths['/servers/create']['post']['responses']> }
  | { name: "Fetch Server", method: 'get', path: `/servers/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}']['get']['responses']> }
  | { name: "Delete / Leave Server", method: 'delete', path: `/servers/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}']['delete']['responses']> }
  | { name: "Edit Server", method: 'patch', path: `/servers/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}']['patch']['responses']> }
  | { name: "Mark Server As Read", method: 'put', path: `/servers/${string}/ack`, query: never, response: MapResponses<schema.paths['/servers/{target}/ack']['put']['responses']> }
  | { name: "Create Channel", method: 'post', path: `/servers/${string}/channels`, query: never, response: MapResponses<schema.paths['/servers/{target}/channels']['post']['responses']> }
  | { name: "Fetch Members", method: 'get', path: `/servers/${string}/members`, query: never, response: MapResponses<schema.paths['/servers/{target}/members']['get']['responses']> }
  | { name: "Fetch Member", method: 'get', path: `/servers/${string}/members/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}/members/{member}']['get']['responses']> }
  | { name: "Kick Member", method: 'delete', path: `/servers/${string}/members/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}/members/{member}']['delete']['responses']> }
  | { name: "Edit Member", method: 'patch', path: `/servers/${string}/members/${string}`, query: never, response: MapResponses<schema.paths['/servers/{server}/members/{target}']['patch']['responses']> }
  | { name: "Ban User", method: 'put', path: `/servers/${string}/bans/${string}`, query: never, response: MapResponses<schema.paths['/servers/{server}/bans/{target}']['put']['responses']> }
  | { name: "Unban user", method: 'delete', path: `/servers/${string}/bans/${string}`, query: never, response: MapResponses<schema.paths['/servers/{server}/bans/{target}']['delete']['responses']> }
  | { name: "Fetch Bans", method: 'get', path: `/servers/${string}/bans`, query: never, response: MapResponses<schema.paths['/servers/{target}/bans']['get']['responses']> }
  | { name: "Fetch Invites", method: 'get', path: `/servers/${string}/invites`, query: never, response: MapResponses<schema.paths['/servers/{target}/invites']['get']['responses']> }
  | { name: "Create Role", method: 'post', path: `/servers/${string}/roles`, query: never, response: MapResponses<schema.paths['/servers/{target}/roles']['post']['responses']> }
  | { name: "Delete Role", method: 'delete', path: `/servers/${string}/roles/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}/roles/{role_id}']['delete']['responses']> }
  | { name: "Edit Role", method: 'patch', path: `/servers/${string}/roles/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}/roles/{role_id}']['patch']['responses']> }
  | { name: "Set Role Permission", method: 'put', path: `/servers/${string}/permissions/${string}`, query: never, response: MapResponses<schema.paths['/servers/{target}/permissions/{role_id}']['put']['responses']> }
  | { name: "Set Default Permission", method: 'put', path: `/servers/${string}/permissions/default`, query: never, response: MapResponses<schema.paths['/servers/{target}/permissions/default']['put']['responses']> }
  | { name: "Fetch Invite", method: 'get', path: `/invites/${string}`, query: never, response: MapResponses<schema.paths['/invites/{target}']['get']['responses']> }
  | { name: "Join Invite", method: 'post', path: `/invites/${string}`, query: never, response: MapResponses<schema.paths['/invites/{target}']['post']['responses']> }
  | { name: "Delete Invite", method: 'delete', path: `/invites/${string}`, query: never, response: MapResponses<schema.paths['/invites/{target}']['delete']['responses']> }
  | { name: "Create Account", method: 'post', path: `/auth/account/create`, query: never, response: MapResponses<schema.paths['/auth/account/create']['post']['responses']> }
  | { name: "Resend Verification", method: 'post', path: `/auth/account/reverify`, query: never, response: MapResponses<schema.paths['/auth/account/reverify']['post']['responses']> }
  | { name: "Fetch Account", method: 'get', path: `/auth/account/`, query: never, response: MapResponses<schema.paths['/auth/account/']['get']['responses']> }
  | { name: "Change Password", method: 'patch', path: `/auth/account/change/password`, query: never, response: MapResponses<schema.paths['/auth/account/change/password']['patch']['responses']> }
  | { name: "Change Email", method: 'patch', path: `/auth/account/change/email`, query: never, response: MapResponses<schema.paths['/auth/account/change/email']['patch']['responses']> }
  | { name: "Verify Email", method: 'post', path: `/auth/account/verify/${string}`, query: never, response: MapResponses<schema.paths['/auth/account/verify/{code}']['post']['responses']> }
  | { name: "Send Password Reset", method: 'post', path: `/auth/account/reset_password`, query: never, response: MapResponses<schema.paths['/auth/account/reset_password']['post']['responses']> }
  | { name: "Password Reset", method: 'patch', path: `/auth/account/reset_password`, query: never, response: MapResponses<schema.paths['/auth/account/reset_password']['patch']['responses']> }
  | { name: "Login", method: 'post', path: `/auth/session/login`, query: never, response: MapResponses<schema.paths['/auth/session/login']['post']['responses']> }
  | { name: "Logout", method: 'post', path: `/auth/session/logout`, query: never, response: MapResponses<schema.paths['/auth/session/logout']['post']['responses']> }
  | { name: "Fetch Sessions", method: 'get', path: `/auth/session/all`, query: never, response: MapResponses<schema.paths['/auth/session/all']['get']['responses']> }
  | { name: "Delete All Sessions", method: 'delete', path: `/auth/session/all`, query: schema.operations['revoke_all_revoke_all']['parameters']['query'], response: MapResponses<schema.paths['/auth/session/all']['delete']['responses']> }
  | { name: "Revoke Session", method: 'delete', path: `/auth/session/${string}`, query: never, response: MapResponses<schema.paths['/auth/session/{id}']['delete']['responses']> }
  | { name: "Edit Session", method: 'patch', path: `/auth/session/${string}`, query: never, response: MapResponses<schema.paths['/auth/session/{id}']['patch']['responses']> }
  | { name: "Check Onboarding Status", method: 'get', path: `/onboard/hello`, query: never, response: MapResponses<schema.paths['/onboard/hello']['get']['responses']> }
  | { name: "Complete Onboarding", method: 'post', path: `/onboard/complete`, query: never, response: MapResponses<schema.paths['/onboard/complete']['post']['responses']> }
  | { name: "Push Subscribe", method: 'post', path: `/push/subscribe`, query: never, response: MapResponses<schema.paths['/push/subscribe']['post']['responses']> }
  | { name: "Unsubscribe", method: 'post', path: `/push/unsubscribe`, query: never, response: MapResponses<schema.paths['/push/unsubscribe']['post']['responses']> }
  | { name: "Fetch Settings", method: 'post', path: `/sync/settings/fetch`, query: never, response: MapResponses<schema.paths['/sync/settings/fetch']['post']['responses']> }
  | { name: "Set Settings", method: 'post', path: `/sync/settings/set`, query: schema.operations['set_settings_req']['parameters']['query'], response: MapResponses<schema.paths['/sync/settings/set']['post']['responses']> }
  | { name: "Fetch Unreads", method: 'get', path: `/sync/unreads`, query: never, response: MapResponses<schema.paths['/sync/unreads']['get']['responses']> }
