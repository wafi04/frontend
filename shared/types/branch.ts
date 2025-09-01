export type Branch = {
  id: number;
  name: string;
  code: string;
  pic: number;
  domain?: string | null;
  is_main_branch: boolean;
  parent_branch_id?: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type BranchData = {
  id: number;
  name: string;
  pic: number;
  code: string;
  domain: string;
  isMainBranch: boolean;
  parentBranchId?: number | null;
  picName: string;
  picEmail: string;
  PicRole: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateBranch = {
  name: string;
  domain?: string | null;
  is_main_branch: boolean;
  parent_branch_id?: number | null;
  is_active: boolean;
};
