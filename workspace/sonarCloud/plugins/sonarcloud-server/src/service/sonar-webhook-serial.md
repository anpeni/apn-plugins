# Documentación del Endpoint de Webhook de SonarCloud

Este documento describe el endpoint `/sonar-webhook` que se utiliza para recibir y procesar webhooks de SonarCloud. A continuación se detallan las interfaces y el código del endpoint.

## Interfaces

Las interfaces definen la estructura de los datos que se manejan en el webhook.

### Interface `QualityGate`

Representa la puerta de calidad asociada al proyecto analizado.

```typescript
interface QualityGate {
  conditions: QualityGateCondition[];
  name: string;
  status: string;
}
```


### Interface `ProjectS`

Representa la puerta de calidad asociada al proyecto analizado.

```typescript

interface ProjectS {
  key: string;
  name: string;
  url: string;
}
```
### Interface `WebhookPayload`

Representa la puerta de calidad asociada al proyecto analizado.

```typescript

interface WebhookPayload {
  serverUrl: string;
  taskId: string;
  status: string;
  analysedAt: string;
  revision: string;
  project: ProjectS;
  properties: Record<string, unknown>; // or any other type based on your actual data structure
  qualityGate: QualityGate;
} 
 
```
 
## Endpoint de Webhook

El endpoint /sonar-webhook recibe y procesa los webhooks de SonarCloud.

### Código del Endpoint

El código del endpoint en Node.js utilizando Express.js se muestra a continuación:

```typescript
 router.post('/sonar-webhook', async (req: Request, res: Response) => {
    const body: WebhookPayload = req.body;
    logger.info('Received a webhook from SonarCloud', { body });
  
    const transformedBody = {
      serverUrl: body.serverUrl || "http://localhost:9000",
      taskId: body.taskId,
      status: body.status,
      analysedAt: body.analysedAt,
      revision: body.revision,
      project: {
        key: body.project.key,
        name: body.project.name,
        url: body.project.url,
      },
      properties: body.properties || {},
      qualityGate: {
        conditions: body.qualityGate.conditions.map((condition: QualityGateCondition) => ({
          errorThreshold: condition.errorThreshold,
          metric: condition.metric,
          onLeakPeriod: condition.onLeakPeriod,
          operator: condition.operator,
          status: condition.status,
          value: condition.value
        })),
        name: body.qualityGate.name,
        status: body.qualityGate.status,
      }
    };
    logger.info('Transformed webhook payload', { transformedBody });
    res.json(transformedBody);
  });

```