import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

// Mock data
const members: TeamMember[] = [
  {
    id: "1",
    name: "Sanzhar Omarov",
    email: "sanzhar.omarov@example.com",
    role: "Admin",
    avatar: "/images/avatars/sanzhar.png",
  },
  {
    id: "2",
    name: "Aisha Nurzhanova",
    email: "aisha.nurzhanova@example.com",
    role: "Issuer",
    avatar: "/images/avatars/aisha-nurzhanova.png",
  },
  {
    id: "3",
    name: "Ali Tlekbai",
    email: "ali.tlekbai@example.com",
    role: "Viewer",
    avatar: "/images/avatars/ali-tlekbai.png",
  },
];

// Mock API calls
const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(members), 500));
};

const addTeamMember = async (newMember: Omit<TeamMember, "id">): Promise<TeamMember> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const member = { ...newMember, id: Date.now().toString() };
      members.push(member);
      resolve(member);
    }, 500)
  );
};

const updateTeamMember = async (updatedMember: Partial<TeamMember> & { id: string }): Promise<TeamMember | null> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index = members.findIndex((m) => m.id === updatedMember.id);
      if (index !== -1) {
        members[index] = { ...members[index], ...updatedMember };
        resolve(members[index]);
      } else {
        resolve(null);
      }
    }, 500)
  );
};

const removeTeamMember = async (memberId: string): Promise<boolean> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index = members.findIndex((m) => m.id === memberId);
      if (index !== -1) {
        members.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500)
  );
};

export const useTeamMembers = () => {
  return useQuery({ queryKey: ["teamMembers"], queryFn: fetchTeamMembers });
};

export const useAddTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({ 
    mutationFn: addTeamMember, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({ 
    mutationFn: updateTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({ 
    mutationFn: removeTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
  });
};
