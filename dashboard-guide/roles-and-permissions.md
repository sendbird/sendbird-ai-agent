# Roles and permissions

In Sendbird Dashboard, each member is assigned a role that defines their access to Sendbird products, including the AI agent. For more granular control over AI agent features, you can create a permission set to manage access to specific agents and their functionalities. To streamline operations, start by designing permission sets first and then create custom roles based on those sets.

This page explains the process of creating and managing roles and permissions, ensuring that members have the appropriate access to AI agent's functionalities.

***

## Difference between roles and permission sets

The table below outlines the key difference between roles and permissions.

<table><thead><tr><th width="123.171875">Category</th><th width="303.5078125">Role</th><th>Permission set</th></tr></thead><tbody><tr><td>Access scope</td><td><ul><li>A dashboard member's access to Sendbird products, including AI agent, and their features.</li></ul></td><td><ul><li>A dashboard member's access to AI agents and their functionalities.</li></ul></td></tr></tbody></table>

***

## Default system roles

Sendbird provides a number of default `SYSTEM ROLE`s with pre-defined permission:

* **Owner**: Have full access to dashboard
* **Admin**: Have all access to dashboard except for the ability to delete organization
* **Billing**: Only have access to Billing in dashboard
* **Desk Admin**: Have access to Desk and its settings
* **Desk Agent**: Only have access to assigned tickets
* **Call User**: Can make and receive calls by using the phone booth in Studio
* **Default**: Can view the list of applications

In addition to the system roles, you can also create custom roles and with the ability to set access permissions that meet your needs. It’s possible to restrict applications when setting up roles, allowing you to limit permissions for each application. Consider it a best practice to assign Dashboard members to Role with the least viable privileges and then add additional permissions to a role as needed.

***

## How to create and manage roles and permissions

To create and manage roles and their permission sets, click on your organization name at the top-right corner of the browser and go to **Roles**. Since roles define access at a broader level, you must first create a **permission set** to control a member’s access within an AI agent workspace. Once created, assign the permission set to a specific role.

### Step 1: Create a permission set

1. On the **Roles** page, go to the **Permission set for AI agent** tab and click **Create permission set+** button.

<figure><img src="../.gitbook/assets/Screenshot 2025-04-28 at 2.45.40 PM.png" alt=""><figcaption></figcaption></figure>

2. Then fill out the following fields and **Save**:

<table><thead><tr><th width="189.90234375">Field</th><th>Description</th></tr></thead><tbody><tr><td>Name</td><td>Provide a unique title for the set.</td></tr><tr><td>Description</td><td>Write a short sentence explaining what this permission set permits.</td></tr><tr><td>Permissions</td><td>Select functionalities accessible with this permission set</td></tr><tr><td>AI agent access</td><td>Select AI agents that can be managed with this set</td></tr></tbody></table>

<figure><img src="../.gitbook/assets/image (61).png" alt=""><figcaption></figcaption></figure>

### Step 2: Create a role

Once you've create a permission set for AI agents, create a new role to assign the set to.

1. Go to the **Roles list** tab and click the **Create role+** button
2. Fill out the following fields and **Save**:

<table><thead><tr><th width="210.17578125">Field</th><th>Description</th></tr></thead><tbody><tr><td>Name</td><td>Provide a unique title for the role.</td></tr><tr><td>Description</td><td>Write a short sentence explaining what this role permits.</td></tr><tr><td>Permissions</td><td>Select products and their functionalities accessible with this role.</td></tr><tr><td>AI agent permission set</td><td>Select permission sets granted to a member with this role. This is exclusive to AI agents only.</td></tr></tbody></table>

<figure><img src="../.gitbook/assets/image (60).png" alt=""><figcaption></figcaption></figure>

<details>

<summary>Create a role for Desk users</summary>

If you have integrated Sendbird Desk with Sendbird AI Agent and need to control member access by product, follow the instructions below:

1. When members should have access to AI Agent pages only:
   1. Go to the **Permission set for AI agent** tab and create a permission set.
   2. Navigate to the **Roles list** tab and create a new role.
   3. In the **Permissions** box:
      1. Enable **View** permission for **Application > Overview** since it's the landing page of the dashboard.
      2. Add the permission set you've created in **Step a**.
   4. Click **Save**.
2. When members should have access to both AI Agent and Desk:
   1. Go to the **Permission set for AI agent** tab and create a permission set.
   2. Navigate to the **Roles list** tab and create a new role.
   3. In the **Permissions** box:
      1. Enable all the permissions allowed for the role, in both **AI Agent** and **Desk Application**.
      2. Add the permission set you've created in **Step a**.
   4. Click **Save**.

</details>

### Step 3: Assign roles to members

1. Once custom roles are set up, you can assign these roles to your Dashboard members.
2. Go to the **Members** page under your organization settings.
3. Click **Invite +** to invite new members to your organization. You can choose from the dropdown list of roles you created earlier.

<figure><img src="../.gitbook/assets/CleanShot 2025-07-24 at 03.27.00@2x.png" alt=""><figcaption></figcaption></figure>
