import { client } from '@/sanity/client';
import { SystemArchitecture, ProjectPageProps } from '../types';
import PageHeaderSection from '@/components/layout/page-header-section';
import PageContentSection from '@/components/layout/page-content-section';
import ExploreUserstories from '@/components/common/explore-cards/userstories';
import ExploreImplementation from '@/components/common/explore-cards/implementation';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const PROJECT_SYSTEM_ARCHITECTURE = `*[_type == "systemArchitecture" && project._ref == $projectId][0] {
  _id,
  _createdAt,
  description,
  coreComponents[] {
    title,
    subtitle,
    features
  },
  dataFlow[] {
    order,
    title,
    description
  },
  dbSchema[] {
    table,
    schema[] {
      column,
      type,
      description
    }
  },
  deploymentStrategy {
    url
  }
}`;

const ArchitecturePage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
  const systemArchitecture: SystemArchitecture = await client.fetch(
    PROJECT_SYSTEM_ARCHITECTURE,
    {
      projectId: id,
    },
  );

  return (
    <main className="mb-5 space-y-8">
      <PageHeaderSection
        description={systemArchitecture.description}
        title="System Architecture"
      />
      <Separator />
      <PageContentSection title="Core Components">
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-3">
          {systemArchitecture.coreComponents.map(component => (
            <div
              key={component.title}
              className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm"
            >
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {component.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {component.subtitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <ul className="space-y-2">
                  {component.features.map(feature => (
                    <li
                      key={component.title + '_' + feature}
                      className="text-muted-foreground flex items-center text-sm"
                    >
                      <div className="bg-muted-foreground mr-3 h-1.5 w-1.5 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </PageContentSection>

      <PageContentSection title="Data Flow & User Journey">
        <div className="space-y-4">
          {systemArchitecture.dataFlow.map(flow => (
            <div
              key={flow.order + '_' + flow.title}
              className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary text-primary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {flow.order}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{flow.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {flow.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageContentSection>

      <PageContentSection title="Database Design">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {systemArchitecture.dbSchema.map(collection => (
            <div
              key={collection.table}
              className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-semibold">{collection.table}</h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-4 border-b pb-2 font-medium">
                  <span>Column</span>
                  <span>Type</span>
                  <span>Description</span>
                </div>
                {collection.schema.map(item => (
                  <div
                    key={item.column}
                    className="text-muted-foreground grid grid-cols-3 gap-4"
                  >
                    <span>{item.column}</span>
                    <span>{item.type}</span>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContentSection>

      {/* <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Security &amp; Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldIcon className="h-6 w-6 text-green-500" />
              <h3 className="font-semibold text-lg">Security Features</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                OAuth 2.0 authentication with GitHub
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Row-level security policies in database
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                CSRF protection via NextAuth.js
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Rate limiting on API endpoints
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Input validation and sanitization
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                Secure session management
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Smartphone className="h-6 w-6 text-blue-500" />
              <h3 className="font-semibold text-lg">
                Performance Optimizations
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Static site generation for documentation
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Image optimization with Next.js
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Code splitting and lazy loading
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                CDN delivery for static assets
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Database query optimization
              </li>
              <li className="text-sm text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                Responsive design patterns
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <PageContentSection title="Deployment Strategy">
        <div className="h-120 w-full rounded-lg border">
          <Skeleton className="h-full w-full" />
        </div>
      </PageContentSection>

      <PageContentSection title="Explore Further">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ExploreUserstories id={id} />
          <ExploreImplementation id={id} />
        </div>
      </PageContentSection>
    </main>
  );
};

export default ArchitecturePage;
