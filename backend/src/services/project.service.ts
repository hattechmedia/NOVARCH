import { projectRepository, IProjectRepository } from '../repositories/project.repository.js';
import { Project, CreateProjectDTO, UpdateProjectDTO, ProjectFilterDTO, ProjectStatus } from '../types/project.types.js';
import { auditService } from './audit.service.js';

/**
 * Project Service Layer
 * 
 * Encapsulates business logic, lifecycle states, and structured audit logs
 * for project and lab content operations.
 */
export class ProjectService {
  constructor(private repo: IProjectRepository = projectRepository) {}

  async getProjects(filter?: ProjectFilterDTO): Promise<Project[]> {
    return this.repo.findAll(filter);
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.repo.findById(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.repo.findBySlug(slug);
  }

  async createProject(dto: CreateProjectDTO, actor = 'system'): Promise<Project> {
    const project = await this.repo.create(dto);

    await auditService.log({
      actor,
      action: 'CREATE',
      resource: 'project',
      resourceId: project.id,
      status: 'SUCCESS',
      metadata: { slug: project.slug, name: project.name, category: project.category },
    });

    return project;
  }

  async updateProject(id: string, dto: UpdateProjectDTO, actor = 'system'): Promise<Project | null> {
    const updated = await this.repo.update(id, dto);

    await auditService.log({
      actor,
      action: 'UPDATE',
      resource: 'project',
      resourceId: id,
      status: updated ? 'SUCCESS' : 'FAILURE',
      metadata: { changes: Object.keys(dto) },
    });

    return updated;
  }

  async setProjectStatus(id: string, status: ProjectStatus, actor = 'system'): Promise<Project | null> {
    const updated = await this.repo.updateStatus(id, status);

    await auditService.log({
      actor,
      action: status === 'published' ? 'PUBLISH' : status === 'archived' ? 'ARCHIVE' : 'UPDATE_STATUS',
      resource: 'project',
      resourceId: id,
      status: updated ? 'SUCCESS' : 'FAILURE',
      metadata: { newStatus: status },
    });

    return updated;
  }

  async deleteProject(id: string, actor = 'system'): Promise<boolean> {
    const success = await this.repo.delete(id);

    await auditService.log({
      actor,
      action: 'DELETE',
      resource: 'project',
      resourceId: id,
      status: success ? 'SUCCESS' : 'FAILURE',
    });

    return success;
  }
}

export const projectService = new ProjectService();
