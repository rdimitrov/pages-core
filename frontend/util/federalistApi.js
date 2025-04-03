
import fetch from './fetch';
import alertActions from '../actions/alertActions';

export const API = '/v0';

function request(endpoint, params = {}, { handleHttpError = true } = {}) {
  const csrfToken = typeof window !== 'undefined' ? window.CSRF_TOKEN : global.CSRF_TOKEN;

  const defaultHeaders = {
    'x-csrf-token': csrfToken,
  };

  const url = `${API}/${endpoint}`;

  const headers = {
    ...defaultHeaders,
    ...(params.headers || {}),
  };
  const finalParams = {
    ...params,
    headers,
  };

  return fetch(url, finalParams).then(response => response.json()).catch((error) => {
    if (handleHttpError) {
      alertActions.httpError(error.message);
    } else {
      throw error;
    }
  });
}

export default {
  request,

  fetchBuilds(site) {
    return request(
      `site/${site.id}/build`,
      {},
      {
        handleHttpError: false,
      },
    );
  },

  fetchBuildLogs(build, offset = 0) {
    return request(`build/${build.id}/log/offset/${offset}`);
  },

  fetchBuild(buildId) {
    return request(`build/${buildId}`);
  },

  fetchTasks(buildId) {
    return request(`build/${buildId}/tasks`);
  },

  fetchOrganization(id) {
    return request(`organization/${id}`);
  },

  fetchOrganizations() {
    return request('organization');
  },

  fetchOrganizationRoles() {
    return request('organization-role');
  },

  inviteToOrganization(id, data) {
    return request(`organization/${id}/invite`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateOrganizationRole(organizationId, roleId, userId) {
    return request('organization-role', {
      method: 'PUT',
      body: JSON.stringify({
        organizationId,
        roleId,
        userId,
      }),
    });
  },

  removeOrganizationRole(organizationId, userId) {
    return request(`organization/${organizationId}/user/${userId}`, {
      method: 'DELETE',
    });
  },

  fetchRoles() {
    return request('role');
  },

  fetchOrganizationMembers(id) {
    return request(`organization/${id}/members`);
  },

  fetchPublishedBranches(site) {
    return request(`site/${site.id}/published-branch`);
  },

  fetchPublishedFiles(id, branch, startAtKey = null) {
    let path = `site/${id}/published-branch/${branch}/published-file`;
    if (startAtKey) {
      path += `?startAtKey=${startAtKey}`;
    }
    return request(path);
  },

  fetchSites() {
    return request('site');
  },

  createSiteDomain(siteId, names, siteBranchConfigId) {
    return request(`site/${siteId}/domain`, {
      method: 'POST',
      body: JSON.stringify({
        names,
        siteBranchConfigId,
      }),
    });
  },

  fetchSiteDomains(siteId) {
    return request(`site/${siteId}/domains`);
  },

  deleteSiteDomain(siteId, domainId) {
    return request(`site/${siteId}/domain/${domainId}`, {
      method: 'DELETE',
    });
  },

  updateSiteDomain(siteId, domainId, { names, siteBranchConfigId } = {}) {
    return request(`site/${siteId}/domain/${domainId}`, {
      method: 'PUT',
      body: JSON.stringify({
        names,
        siteBranchConfigId,
      }),
    });
  },

  fetchUser() {
    return request('me');
  },

  fetchUserActions(siteId) {
    return request(`site/${siteId}/user-action`);
  },

  addUserToSite({ owner, repository }) {
    return request(
      'site/user',
      {
        method: 'POST',
        body: JSON.stringify({
          owner,
          repository,
        }),
      },
      {
        // we want to handle the error elsewhere in order
        // to show the additional AddSite fields
        handleHttpError: false,
      },
    );
  },

  removeUserFromSite(siteId, userId) {
    return request(
      `site/${siteId}/user/${userId}`,
      { method: 'DELETE' },
      {
        handleHttpError: false,
      },
    );
  },

  addSite(site) {
    return request(
      'site',
      {
        method: 'POST',
        body: JSON.stringify(site),
      },
      {
        handleHttpError: false,
      },
    );
  },

  updateSite(site, data) {
    return request(
      `site/${site.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      {
        handleHttpError: false,
      },
    );
  },

  deleteSite(siteId) {
    return request(
      `site/${siteId}`,
      { method: 'DELETE' },
      {
        handleHttpError: false,
      },
    );
  },

  restartBuild(buildId, siteId) {
    return request('build/', {
      method: 'POST',
      body: JSON.stringify({
        buildId,
        siteId,
      }),
    });
  },

  createBuild(sha, branch, siteId) {
    return request('build/', {
      method: 'POST',
      body: JSON.stringify({
        sha,
        siteId,
        branch,
      }),
    });
  },

  updateUserSettings(userSettings) {
    return request(
      'me/settings',
      {
        method: 'PUT',
        body: JSON.stringify(userSettings),
      },
      {
        handleHttpError: false,
      },
    );
  },

  deleteSiteBranchConfig(siteId, siteBranchConfigId) {
    return request(`site/${siteId}/branch-config/${siteBranchConfigId}`, {
      method: 'DELETE',
    });
  },

  createSiteBranchConfig(siteId, branch, config = {}, context) {
    return request(`site/${siteId}/branch-config`, {
      method: 'POST',
      body: JSON.stringify({
        branch,
        config,
        context,
      }),
    });
  },

  fetchSiteBranchConfigs(siteId) {
    return request(`site/${siteId}/branch-config`);
  },

  updateSiteBranchConfig(siteId, siteBranchConfigId, branch, config = {}, context) {
    return request(`site/${siteId}/branch-config/${siteBranchConfigId}`, {
      method: 'PUT',
      body: JSON.stringify({
        branch,
        config,
        context,
      }),
    });
  },

  fetchUserEnvironmentVariables(siteId) {
    return request(`site/${siteId}/user-environment-variable`);
  },

  deleteUserEnvironmentVariable(siteId, uevId) {
    return request(
      `site/${siteId}/user-environment-variable/${uevId}`,
      {
        method: 'DELETE',
      },
      {
        handleHttpError: false,
      },
    );
  },

  createUserEnvironmentVariable(siteId, uev) {
    return request(
      `site/${siteId}/user-environment-variable`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: uev.name,
          value: uev.value,
        }),
      },
      {
        handleHttpError: false,
      },
    );
  },

  removeBasicAuthFromSite(siteId) {
    return request(
      `site/${siteId}/basic-auth`,
      {
        method: 'DELETE',
      },
      {
        handleHttpError: false,
      },
    );
  },

  saveBasicAuthToSite(siteId, credentials) {
    return request(
      `site/${siteId}/basic-auth`,
      {
        method: 'POST',
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      },
      {
        handleHttpError: false,
      },
    );
  },

  revokeApplicationGrant() {
    return request(
      'me/githubtoken',
      {
        method: 'DELETE',
      },
      {
        handleHttpError: false,
      },
    );
  },

  getBuildTaskTypes() {
    return request('/tasks/types');
  },

  getDefaultBuildScanRules() {
    return request('/tasks/default-rules');
  },

  getSiteBuildTasks(siteId) {
    return request(`/site/${siteId}/task`);
  },

  updateSiteBuildTask(siteId, taskId, metadata, query = '') {
    return request(`/site/${siteId}/task/${taskId}${query}`, {
      method: 'PUT',
      body: JSON.stringify({
        metadata,
      }),
    });
  },

  fetchSiteTasks(siteId) {
    return request(`site/${siteId}/tasks`);
  },

  runScansForBuild(buildId) {
    return request(
      `/build/${buildId}/task`,
      { method: 'POST' },
      {
        handleHttpError: false,
      },
    );
  },

  fetchReportData(id, subPage) {
    return request(`tasks/${id}/report/${subPage || ''}`);
  },
};

// Rado: this should have probably done nothing, in the PR they just removed the prefixed / in some of the paths
