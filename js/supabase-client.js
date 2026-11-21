
// Supabase Client Configuration
const SUPABASE_URL = 'https://zpvgrhdhpeszogznftju.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Zpoyi29TmYXPtL11lX1qfg_580_2ek2';

// Initialize Supabase client
let supabaseClient;

function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );
        return true;
    }

    console.error('Supabase library not loaded');
    return false;
}

// Database operations using secure RPC functions
const db = {
    async createGroup(groupName, participantNames, maxExclusions) {
        const { data, error } = await supabaseClient.rpc('create_group', {
            p_name: groupName,
            p_participant_names: participantNames,
            p_max_exclusions: maxExclusions
        });
        if (error) throw error;
        return data;
    },

    async getGroupByAdminToken(adminToken) {
        const { data, error } = await supabaseClient.rpc('get_group_by_admin_token', {
            p_admin_token: adminToken
        });
        if (error) throw error;
        return data;
    },

    async getParticipantByToken(token) {
        const { data, error } = await supabaseClient.rpc('get_participant_by_token', {
            p_token: token
        });
        if (error) throw error;
        return data;
    },

    async getParticipantsForAssignment(adminToken) {
        const { data, error } = await supabaseClient.rpc('get_participants_for_assignment', {
            p_admin_token: adminToken
        });
        if (error) throw error;
        return data;
    },

    async submitExclusions(participantToken, exclusions) {
        const { data, error } = await supabaseClient.rpc('submit_exclusions', {
            p_token: participantToken,
            p_exclusions: exclusions
        });
        if (error) throw error;
        return data;
    },

    async updateGroupStatus(adminToken, status) {
        const { data, error } = await supabaseClient.rpc('update_group_status', {
            p_admin_token: adminToken,
            p_status: status
        });
        if (error) throw error;
        return data;
    },

    async saveAssignments(adminToken, assignments) {
        const { data, error } = await supabaseClient.rpc('save_assignments', {
            p_admin_token: adminToken,
            p_assignments: assignments
        });
        if (error) throw error;
        return data;
    },

    async markGroupAssigned(adminToken) {
        return this.updateGroupStatus(adminToken, 'assigned');
    }
};

window.db = db;
window.initSupabase = initSupabase;
