// This file contains sample xml data that is fed to the openai as a sample whenever we call for prompts
export const default_xml = `
<mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="AWS Cloud" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;strokeColor=#232F3E;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#232F3E;dashed=0;" vertex="1" parent="1">
      <mxGeometry x="40" y="80" width="760" height="600" as="geometry" />
    </mxCell>
    <mxCell id="3" value="VPC" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_vpc;strokeColor=#248814;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#AAB7B8;dashed=0;" vertex="1" parent="2">
      <mxGeometry x="40" y="40" width="680" height="520" as="geometry" />
    </mxCell>
    <mxCell id="4" value="Angular.js&#xa;Frontend" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#D45B07;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.instance2;" vertex="1" parent="3">
      <mxGeometry x="80" y="80" width="48" height="48" as="geometry" />
    </mxCell>
    <mxCell id="5" value="Java Spring&#xa;Backend" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#D45B07;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.instance2;" vertex="1" parent="3">
      <mxGeometry x="280" y="80" width="48" height="48" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Java Eureka&#xa;Service Discovery" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#D45B07;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.instance2;" vertex="1" parent="3">
      <mxGeometry x="280" y="200" width="48" height="48" as="geometry" />
    </mxCell>
    <mxCell id="7" value="PostgreSQL&#xa;RDS" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;gradientColor=#4D72F3;gradientDirection=north;fillColor=#3334B9;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rds;" vertex="1" parent="3">
      <mxGeometry x="480" y="80" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="8" value="API Gateway" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;gradientColor=#945DF2;gradientDirection=north;fillColor=#5A30B5;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.api_gateway;" vertex="1" parent="3">
      <mxGeometry x="80" y="200" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="9" value="IAM" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;gradientColor=#F54749;gradientDirection=north;fillColor=#C7131F;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.identity_and_access_management;" vertex="1" parent="3">
      <mxGeometry x="80" y="360" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="10" value="Network Firewall" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;gradientColor=#F54749;gradientDirection=north;fillColor=#C7131F;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.network_firewall;" vertex="1" parent="3">
      <mxGeometry x="280" y="360" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="11" value="CloudWatch" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch_2;" vertex="1" parent="3">
      <mxGeometry x="480" y="360" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="12" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=none;endFill=1;strokeColor=#545B64;rounded=0;" edge="1" parent="3" source="4" target="8">
      <mxGeometry width="100" relative="1" as="geometry">
        <mxPoint x="300" y="270" as="sourcePoint" />
        <mxPoint x="400" y="270" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="13" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=none;endFill=1;strokeColor=#545B64;rounded=0;" edge="1" parent="3" source="8" target="5">
      <mxGeometry width="100" relative="1" as="geometry">
        <mxPoint x="300" y="270" as="sourcePoint" />
        <mxPoint x="400" y="270" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="14" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=none;endFill=1;strokeColor=#545B64;rounded=0;" edge="1" parent="3" source="5" target="7">
      <mxGeometry width="100" relative="1" as="geometry">
        <mxPoint x="300" y="270" as="sourcePoint" />
        <mxPoint x="400" y="270" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="15" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=none;endFill=1;strokeColor=#545B64;rounded=0;" edge="1" parent="3" source="5" target="6">
      <mxGeometry width="100" relative="1" as="geometry">
        <mxPoint x="300" y="270" as="sourcePoint" />
        <mxPoint x="400" y="270" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="16" value="User" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#232F3E;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.user;" vertex="1" parent="1">
      <mxGeometry x="380" y="10" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="17" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=none;endFill=1;strokeColor=#545B64;rounded=0;" edge="1" parent="1" source="16" target="4">
      <mxGeometry width="100" relative="1" as="geometry">
        <mxPoint x="360" y="410" as="sourcePoint" />
        <mxPoint x="460" y="410" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
`;

export const default_azure = `
 <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="2" value="Azure Cloud" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;strokeColor=#232F3E;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#232F3E;dashed=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="760" height="640" as="geometry" />
        </mxCell>
        <mxCell id="3" value="App Service" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/app_services/App_Services.svg;" vertex="1" parent="2">
          <mxGeometry x="40" y="80" width="64" height="64" as="geometry" />
        </mxCell>
        <mxCell id="4" value="React.js Frontend" style="rounded=1;whiteSpace=wrap;html=1;fontSize=12;" vertex="1" parent="2">
          <mxGeometry x="120" y="92" width="120" height="40" as="geometry" />
        </mxCell>
        <mxCell id="5" value="Azure Functions" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/compute/Function_Apps.svg;" vertex="1" parent="2">
          <mxGeometry x="40" y="200" width="68" height="60" as="geometry" />
        </mxCell>
        <mxCell id="6" value="Python Backend API" style="rounded=1;whiteSpace=wrap;html=1;fontSize=12;" vertex="1" parent="2">
          <mxGeometry x="120" y="210" width="120" height="40" as="geometry" />
        </mxCell>
        <mxCell id="7" value="Azure OpenAI Service" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/ai_machine_learning/Cognitive_Services.svg;" vertex="1" parent="2">
          <mxGeometry x="40" y="320" width="68" height="48" as="geometry" />
        </mxCell>
        <mxCell id="8" value="Azure SQL Database" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/databases/SQL_Database.svg;" vertex="1" parent="2">
          <mxGeometry x="600" y="80" width="48" height="64" as="geometry" />
        </mxCell>
        <mxCell id="9" value="Azure Blob Storage" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/storage/Storage_Accounts.svg;" vertex="1" parent="2">
          <mxGeometry x="600" y="200" width="65" height="52" as="geometry" />
        </mxCell>
        <mxCell id="10" value="Azure Monitor" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/management_governance/Monitor.svg;" vertex="1" parent="2">
          <mxGeometry x="600" y="320" width="64" height="64" as="geometry" />
        </mxCell>
        <mxCell id="11" value="Azure Active Directory" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/identity/Azure_Active_Directory.svg;" vertex="1" parent="2">
          <mxGeometry x="40" y="440" width="70" height="64" as="geometry" />
        </mxCell>
        <mxCell id="12" value="Azure Firewall" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/networking/Firewalls.svg;" vertex="1" parent="2">
          <mxGeometry x="600" y="440" width="71" height="60" as="geometry" />
        </mxCell>
        <mxCell id="13" value="Azure API Management" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/app_services/API_Management_Services.svg;" vertex="1" parent="2">
          <mxGeometry x="320" y="80" width="65" height="60" as="geometry" />
        </mxCell>
        <mxCell id="14" value="Network Security Groups" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/networking/Network_Security_Groups.svg;" vertex="1" parent="2">
          <mxGeometry x="320" y="200" width="56" height="68" as="geometry" />
        </mxCell>
        <mxCell id="15" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="2" source="4" target="13">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="410" as="sourcePoint" />
            <mxPoint x="440" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="16" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="2" source="6" target="14">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="410" as="sourcePoint" />
            <mxPoint x="440" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="17" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="2" source="13" target="8">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="410" as="sourcePoint" />
            <mxPoint x="440" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="18" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="2" source="14" target="9">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="410" as="sourcePoint" />
            <mxPoint x="440" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="19" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="2" source="13" target="14">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="410" as="sourcePoint" />
            <mxPoint x="440" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="20" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="2" source="7" target="14">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="410" as="sourcePoint" />
            <mxPoint x="440" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="21" value="User" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;" vertex="1" parent="1">
          <mxGeometry x="10" y="350" width="30" height="60" as="geometry" />
        </mxCell>
        <mxCell id="22" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.3333333333333333;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="21" target="3">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="430" y="450" as="sourcePoint" />
            <mxPoint x="480" y="400" as="targetPoint" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
    `