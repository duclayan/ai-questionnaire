// This file contains sample xml data that is fed to the openai as a sample whenever we call for prompts
export const default_xml = `
<mxGraphModel dx="784" dy="742" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
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

`

export const default_azure = `
<mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Azure VM" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/compute/Virtual_Machine.svg;" vertex="1" parent="1">
      <mxGeometry x="120" y="240" width="69" height="64" as="geometry" />
    </mxCell>
    <mxCell id="3" value="Azure Storage" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/storage/Storage_Accounts.svg;" vertex="1" parent="1">
      <mxGeometry x="280" y="240" width="65" height="52" as="geometry" />
    </mxCell>
    <mxCell id="4" value="Azure SQL" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/databases/SQL_Database.svg;" vertex="1" parent="1">
      <mxGeometry x="440" y="240" width="48" height="64" as="geometry" />
    </mxCell>
    <mxCell id="5" value="Azure Functions" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/compute/Function_Apps.svg;" vertex="1" parent="1">
      <mxGeometry x="600" y="240" width="68" height="60" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Azure AD" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/identity/Azure_Active_Directory.svg;" vertex="1" parent="1">
      <mxGeometry x="360" y="80" width="70" height="64" as="geometry" />
    </mxCell>
    <mxCell id="7" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="2" target="3">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="8" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="3" target="4">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="9" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="4" target="5">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="10" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="6" target="2">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="11" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="6" target="3">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="12" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="6" target="4">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="13" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="6" target="5">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="14" value="User" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;" vertex="1" parent="1">
      <mxGeometry x="40" y="80" width="30" height="60" as="geometry" />
    </mxCell>
    <mxCell id="15" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="14" target="6">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="16" value="Azure App Service" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/app_services/App_Services.svg;" vertex="1" parent="1">
      <mxGeometry x="280" y="400" width="64" height="64" as="geometry" />
    </mxCell>
    <mxCell id="17" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="2" target="16">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="18" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="16" target="4">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="19" value="Azure Monitor" style="aspect=fixed;html=1;points=[];align=center;image;fontSize=12;image=img/lib/azure2/management_governance/Monitor.svg;" vertex="1" parent="1">
      <mxGeometry x="600" y="80" width="64" height="64" as="geometry" />
    </mxCell>
    <mxCell id="20" value="" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="19" target="2">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="21" value="" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="19" target="5">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="22" value="" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="19" target="16">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="430" as="sourcePoint" />
        <mxPoint x="440" y="380" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>

`

export const default_gcp = `
<mxGraphModel dx="1252" dy="702" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1007" value="&lt;b&gt;Google &lt;/b&gt;Cloud Platform" style="fillColor=#F6F6F6;strokeColor=none;shadow=0;gradientColor=none;fontSize=14;align=left;spacing=10;fontColor=#717171;9E9E9E;verticalAlign=top;spacingTop=-4;fontStyle=0;spacingLeft=40;html=1;" parent="1" vertex="1">
      <mxGeometry x="250" y="120" width="658" height="520" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1008" value="" style="shape=mxgraph.gcp2.google_cloud_platform;fillColor=#F6F6F6;strokeColor=none;shadow=0;gradientColor=none;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry width="23" height="20" relative="1" as="geometry">
        <mxPoint x="20" y="10" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1141" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry x="207.75" y="290" width="192.25" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1142" value="&lt;font color=&quot;#000000&quot;&gt;Processed Events&lt;br&gt;(Events Time Series)&lt;/font&gt;&lt;br&gt;Cloud Bigtable" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;" parent="GuzJ8BqgIlNCJu6hI-l5-1141" vertex="1">
      <mxGeometry width="27" height="30" relative="1" as="geometry">
        <mxPoint x="16" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1147" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry x="466" y="70" width="166" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1148" value="&lt;font color=&quot;#000000&quot;&gt;Push to Devices&lt;/font&gt;&lt;br&gt;App Engine" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;" parent="GuzJ8BqgIlNCJu6hI-l5-1147" vertex="1">
      <mxGeometry width="30" height="24" relative="1" as="geometry">
        <mxPoint x="15" y="18" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1149" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry x="470" y="160" width="159" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1150" value="&lt;font color=&quot;#000000&quot;&gt;Messaging&lt;br&gt;(Rules Actions)&lt;/font&gt;&lt;br&gt;Pub/Sub" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;" parent="GuzJ8BqgIlNCJu6hI-l5-1149" vertex="1">
      <mxGeometry width="27" height="30" relative="1" as="geometry">
        <mxPoint x="16" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1048" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" source="GuzJ8BqgIlNCJu6hI-l5-1149" target="GuzJ8BqgIlNCJu6hI-l5-1147" edge="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1151" value="" style="shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry x="466" y="260" width="178" height="68" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1152" value="&lt;font color=&quot;#000000&quot;&gt;Cloud Apps&lt;/font&gt;&lt;br&gt;Compute Engine" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;" parent="GuzJ8BqgIlNCJu6hI-l5-1151" vertex="1">
      <mxGeometry width="30" height="30" relative="1" as="geometry">
        <mxPoint x="15" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1049" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" source="GuzJ8BqgIlNCJu6hI-l5-1149" target="GuzJ8BqgIlNCJu6hI-l5-1151" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="554" y="260" />
          <mxPoint x="554" y="260" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1153" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry x="466" y="360" width="182" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1154" value="&lt;font color=&quot;#000000&quot;&gt;Data Warehouse&lt;br&gt;(Execution Results)&lt;/font&gt;&lt;br&gt;BigQuery" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;" parent="GuzJ8BqgIlNCJu6hI-l5-1153" vertex="1">
      <mxGeometry width="30" height="30" relative="1" as="geometry">
        <mxPoint x="15" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1155" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" vertex="1">
      <mxGeometry x="476.5" y="440" width="145" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1156" value="&lt;font color=&quot;#000000&quot;&gt;Data Analysis&lt;/font&gt;&lt;br&gt;Datalab" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjI3MS44OTgxMDE4MDY2NDA2IiBoZWlnaHQ9IjQyMy4wMDQwMjgzMjAzMTI1IiB2aWV3Qm94PSIwLjAwMDQ2MTI3MDM2MzMwMjkwMTQgMCAyNzEuODk4MTAxODA2NjQwNiA0MjMuMDA0MDI4MzIwMzEyNSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDtmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTcuMzc4IDE0NC43NzRhMy4xMSAzLjExIDAgMCAxIDMuMTA1IDIuOTM0bC4wMDUuMTc3djE3LjEwN2EzLjExIDMuMTEgMCAwIDEtMi45MzQgMy4xMDVsLS4xNzcuMDA1aC0xMi40NDF2MzAuNjQ5YzAgMS4yMjcuMjk3IDIuNDM1Ljg2MiAzLjUyMmwuMTYxLjI5MyA4My44OTUgMTQ0LjI2MmExNS4yNiAxNS4yNiAwIDAgMSAuMTgyIDE0LjkzNmwtLjE4Mi4zMjQtMzAuNDMxIDUzLjI4NmExNS4yNiAxNS4yNiAwIDAgMS0xMi44NjEgNy42MjZsLS4zNTUuMDA0SDQ1LjY5MmExNS4yNiAxNS4yNiAwIDAgMS0xMy4wMzUtNy4zMjRsLS4xODEtLjMwNS0zMC40MzEtNTMuMjg2YTE1LjI2IDE1LjI2IDAgMCAxLS4xODItMTQuOTM2bC4xODItLjMyNCA4My42NzQtMTQ0LjI2MmMuNjIxLTEuMDc3IDEuMTYtMi4yODkgMS4yMzQtMy41MjhsLjAwOS0uMjg3di0zMC42NDlINzQuNTJjLTEuNjU4IDAtMy4wMTQtMS4yOTktMy4xMDUtMi45MzRsLS4wMDUtLjE3NnYtMTcuMTA3YTMuMTEgMy4xMSAwIDAgMSAyLjkzNC0zLjEwNWwuMTc2LS4wMDV6bS0zNS43NjkgMjMuMzI3aC01MS4zMnYzNS40MDVjMCAyLjUzMS0uNjI4IDUuMDE4LTEuODI2IDcuMjQybC0uMjE3LjM5TDI4LjAzMyAzNTAuOWE3LjYzIDcuNjMgMCAwIDAtLjEzOSA3LjM3NWwuMTQxLjI1NSAyMC43NDEgMzUuOTIxYTcuNjMgNy42MyAwIDAgMCA2LjMyNyAzLjgxbC4yODEuMDA1aDI1LjU3MmwtMjIuNjA1LTM5LjE1M2MtMS4zMTQtMi4yNzYtMS4zNjEtNS4wNjItLjE0MS03LjM3NWwuMTQxLS4yNTUgMTkuNjc5LTM0LjA4NmgxNDYuNjA2TDIxMi45ODggMjk3LjFoLTU0LjI1OWwtOC44MjEtMTUuMjc4aDU0LjMxMmwtMTYuMzMzLTI4LjQ2aC01NC43OGwtOC44MjEtMTUuMjc4aDU0LjgzM2wtMTUuNDY1LTI2Ljk0NmExNS4yNyAxNS4yNyAwIDAgMS0yLjAzOS03LjE4NWwtLjAwNy0uNDQ2em03Mi44NDQgMTY2LjQwMWwtNTQuMTgxLjAwMSA4LjgyMSAxNS41NTJoNTQuMjg1ek0xMDQuOTIxIDc5Ljc5NWM4LjQyNyAwIDE1LjI1OSA2LjgzMyAxNS4yNTkgMTUuMjYxcy02LjgzMiAxNS4yNTktMTUuMjU5IDE1LjI1OS0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OSA2LjgzMi0xNS4yNjEgMTUuMjU5LTE1LjI2MXptNTcuNTc1LTMyLjc0M2MxMi42NDIgMCAyMi44OSAxMC4yNDcgMjIuODkgMjIuODg5cy0xMC4yNDkgMjIuODg5LTIyLjg5IDIyLjg4OS0yMi44ODktMTAuMjQ5LTIyLjg4OS0yMi44ODkgMTAuMjQ3LTIyLjg4OSAyMi44ODktMjIuODg5ek0xMjcuODEgMGM4LjQyNyAwIDE1LjI2MSA2LjgzMyAxNS4yNjEgMTUuMjYxUzEzNi4yMzcgMzAuNTIgMTI3LjgxIDMwLjUycy0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OVMxMTkuMzg0IDAgMTI3LjgxIDB6Ii8+JiN4YTs8L3N2Zz4=;" parent="GuzJ8BqgIlNCJu6hI-l5-1155" vertex="1">
      <mxGeometry width="20" height="30" relative="1" as="geometry">
        <mxPoint x="20" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1055" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="GuzJ8BqgIlNCJu6hI-l5-1007" source="GuzJ8BqgIlNCJu6hI-l5-1153" target="GuzJ8BqgIlNCJu6hI-l5-1155" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="550" y="430" />
          <mxPoint x="550" y="430" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1009" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1011" target="GuzJ8BqgIlNCJu6hI-l5-1153" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="688" y="625" />
          <mxPoint x="688" y="510" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1010" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1011" target="GuzJ8BqgIlNCJu6hI-l5-1149" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="688" y="625" />
          <mxPoint x="688" y="310" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1011" value="Streaming" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=#4284F3;gradientColor=none;shadow=0;dashed=1;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;" parent="1" vertex="1">
      <mxGeometry x="443.25" y="540" width="170" height="170" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1012" value="Streaming" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=#4284F3;gradientColor=none;shadow=0;dashed=1;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;" parent="1" vertex="1">
      <mxGeometry x="115.25" y="170" width="534.75" height="210" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1013" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1014" target="GuzJ8BqgIlNCJu6hI-l5-1131" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="245.25" y="330" />
          <mxPoint x="245.25" y="330" />
        </Array>
        <mxPoint x="235.25" y="305" as="sourcePoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1014" value="On-Premises&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Applications&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#EFEBE9;" parent="1" vertex="1">
      <mxGeometry x="125.25" y="240" width="110" height="130" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1015" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
      <mxGeometry x="145.25" y="290" width="70" height="70" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1016" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.application;part=1;" parent="GuzJ8BqgIlNCJu6hI-l5-1015" vertex="1">
      <mxGeometry x="0.5" width="50" height="40" relative="1" as="geometry">
        <mxPoint x="-25" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1017" value="Batch" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=#4284F3;gradientColor=none;shadow=0;dashed=1;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;" parent="1" vertex="1">
      <mxGeometry x="115.25" y="450" width="314.75" height="210" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1018" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1019" target="GuzJ8BqgIlNCJu6hI-l5-1139" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="245.25" y="520" />
          <mxPoint x="245.25" y="520" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1019" value="On-Premises&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Databases&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#EFEBE9;" parent="1" vertex="1">
      <mxGeometry x="125.25" y="478.5" width="110" height="130" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1020" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
      <mxGeometry x="145.25" y="527.5" width="70" height="69" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1021" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.database;part=1;" parent="GuzJ8BqgIlNCJu6hI-l5-1020" vertex="1">
      <mxGeometry x="0.5" width="50" height="45" relative="1" as="geometry">
        <mxPoint x="-25" y="12.5" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1022" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1133" target="GuzJ8BqgIlNCJu6hI-l5-1131" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1025" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1131" target="GuzJ8BqgIlNCJu6hI-l5-1135" edge="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1028" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1135" target="GuzJ8BqgIlNCJu6hI-l5-1141" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="554" y="370" />
          <mxPoint x="554" y="370" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1029" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1135" target="GuzJ8BqgIlNCJu6hI-l5-1011" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="660" y="330" />
          <mxPoint x="660" y="510" />
          <mxPoint x="568" y="510" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1032" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1139" target="GuzJ8BqgIlNCJu6hI-l5-1011" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="323.25" y="510" />
          <mxPoint x="513.25" y="510" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1033" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1139" target="GuzJ8BqgIlNCJu6hI-l5-1141" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="513" y="510" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1036" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1137" target="GuzJ8BqgIlNCJu6hI-l5-1139" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1045" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1147" target="GuzJ8BqgIlNCJu6hI-l5-1060" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1025" y="220" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1054" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="GuzJ8BqgIlNCJu6hI-l5-1153" target="GuzJ8BqgIlNCJu6hI-l5-1063" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="930" y="510" />
          <mxPoint x="930" y="510" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1060" value="Mobile Devices&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Push Notification&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#F1F8E9;" parent="1" vertex="1">
      <mxGeometry x="938" y="170" width="110" height="130" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1061" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
      <mxGeometry x="958" y="215" width="70" height="70" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1062" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.mobile_devices;part=1;" parent="GuzJ8BqgIlNCJu6hI-l5-1061" vertex="1">
      <mxGeometry x="0.5" width="50" height="36.5" relative="1" as="geometry">
        <mxPoint x="-25" y="16.75" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1063" value="Report &amp;amp; Share&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Business Analysis&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#F3E5F5;" parent="1" vertex="1">
      <mxGeometry x="938" y="451" width="170" height="128" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1064" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
      <mxGeometry x="948" y="498" width="70" height="70" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1065" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.report;part=1;" parent="GuzJ8BqgIlNCJu6hI-l5-1064" vertex="1">
      <mxGeometry x="0.5" width="50" height="50" relative="1" as="geometry">
        <mxPoint x="-25" y="10" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1066" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
      <mxGeometry x="1028" y="498" width="70" height="70" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1067" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.users;part=1;" parent="GuzJ8BqgIlNCJu6hI-l5-1066" vertex="1">
      <mxGeometry x="0.5" width="50" height="31.5" relative="1" as="geometry">
        <mxPoint x="-25" y="19.25" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1131" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="287.25" y="300" width="130" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1132" value="&lt;font color=&quot;#000000&quot;&gt;Streaming&lt;/font&gt;&lt;br&gt;Pub/Sub" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;" parent="GuzJ8BqgIlNCJu6hI-l5-1131" vertex="1">
      <mxGeometry width="27" height="30" relative="1" as="geometry">
        <mxPoint x="16" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1133" value="" style="shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="263.25" y="196" width="178" height="68" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1134" value="&lt;font color=&quot;#000000&quot;&gt;Cloud Apps&lt;/font&gt;&lt;br&gt;Compute Engine" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;" parent="GuzJ8BqgIlNCJu6hI-l5-1133" vertex="1">
      <mxGeometry width="30" height="30" relative="1" as="geometry">
        <mxPoint x="15" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1135" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="445.5" y="300" width="194.5" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1136" value="&lt;font color=&quot;#000000&quot;&gt;Processing&lt;br&gt;(Transaction Streams)&lt;/font&gt;&lt;br&gt;Dataflow" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;" parent="GuzJ8BqgIlNCJu6hI-l5-1135" vertex="1">
      <mxGeometry width="22" height="30" relative="1" as="geometry">
        <mxPoint x="19" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1137" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="261.25" y="570" width="158.75" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1138" value="&lt;font color=&quot;#000000&quot;&gt;Cloud Data&lt;/font&gt;&lt;br&gt;Cloud Storage" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;" parent="GuzJ8BqgIlNCJu6hI-l5-1137" vertex="1">
      <mxGeometry width="30" height="24" relative="1" as="geometry">
        <mxPoint x="15" y="18" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1139" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="261.25" y="490" width="158.75" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1140" value="&lt;font color=&quot;#000000&quot;&gt;ETL&lt;br&gt;(Transform Data)&lt;/font&gt;&lt;br&gt;Dataflow" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;" parent="GuzJ8BqgIlNCJu6hI-l5-1139" vertex="1">
      <mxGeometry width="22" height="30" relative="1" as="geometry">
        <mxPoint x="19" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1143" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="454.25" y="570" width="145.75" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1144" value="&lt;font color=&quot;#000000&quot;&gt;Rules Engine&lt;/font&gt;&lt;br&gt;Dataflow" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;" parent="GuzJ8BqgIlNCJu6hI-l5-1143" vertex="1">
      <mxGeometry width="22" height="30" relative="1" as="geometry">
        <mxPoint x="19" y="15" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1145" value="" style="strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;" parent="1" vertex="1">
      <mxGeometry x="454.25" y="640" width="145" height="60" as="geometry" />
    </mxCell>
    <mxCell id="GuzJ8BqgIlNCJu6hI-l5-1146" value="&lt;font color=&quot;#000000&quot;&gt;Rules Engine&lt;/font&gt;&lt;br&gt;Dataproc" style="editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjM2MzAxMjMxMzg0Mjc3MyIgaGVpZ2h0PSIxNy45NzU1MjY4MDk2OTIzODMiIHZpZXdCb3g9IjAuMDAwNTYwMDI1NjI2MzI3ODQyNSAwLjYxOTYyOTc0MDcxNTAyNjkgMTkuMzYzMDEyMzEzODQyNzczIDE3Ljk3NTUyNjgwOTY5MjM4MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAgc3QxIj4mI3hhOwkJPHBhdGggZD0iTTQuNjkgMTYuNGwxMC4xOS01Ljg5Ljk3IDEuNjktMTAuMTggNS44OHoiLz4mI3hhOwkJPHBhdGggZD0iTTcuNSA0LjR2MTAuMzVsLTEuODcgMS40MVY0LjR6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNy40OSAxMS4ybC0uOTcgMS42OC04Ljk2LTUuMTktLjI2LTIuMzZ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAgc3QyIiBkPSJNMTIuMzkgOC4yNkw3LjMgNS4zM2wuMjYgMi4zNiAxLjUxLjg2YTQgNCAwIDAgMCAzLjMyLS4yOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MSIgZD0iTTYuMTMgNi4yOWgwYTMuNzggMy43OCAwIDAgMSA1LjE2NS01LjE2M0EzLjc4IDMuNzggMCAwIDEgOS40IDguMThhMy44IDMuOCAwIDAgMS0zLjI3LTEuODl6TTExIDMuNDlhMS44NCAxLjg0IDAgMCAwLTEuNTktLjkyQTEuODMgMS44MyAwIDAgMCA3LjU3IDQuNGExLjg0IDEuODQgMCAwIDAgMi43OTQgMS43MDZBMS44NCAxLjg0IDAgMCAwIDExLjI0IDQuNGExLjggMS44IDAgMCAwLS4yNC0uOTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDIiIGQ9Ik01LjYzIDEwLjk0djUuMjJsMS44Ny0xLjQxdi0xLjYzYTMuMjkgMy4yOSAwIDAgMC0xLjg3LTIuMTh6bTUuNyAzLjg3bDQuNTItMi42MS0yLjIxLTEtMS4yNS44YTQuMjMgNC4yMyAwIDAgMC0xLjA2IDIuODZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDEiIGQ9Ik0uNTEgMTYuN2gwYTMuNzcgMy43NyAwIDAgMSAxLjM4LTUuMTYgMy43MiAzLjcyIDAgMCAxIDIuODYtLjM4QTMuNzggMy43OCAwIDEgMSAuNTEgMTYuN3ptNC44NS0yLjgxQTEuNzkgMS43OSAwIDAgMCA0LjI1IDEzYTEuODMgMS44MyAwIDAgMC0yLjA2IDIuNjloMGMuMzI5LjU2Ni45MzQuOTE0IDEuNTg5LjkxM2ExLjgzIDEuODMgMCAwIDAgMS41ODUtLjkyYy4zMjYtLjU2OC4zMjQtMS4yNjctLjAwNC0xLjgzM3ptNi45NyAyLjQ3aDBhMy43OSAzLjc5IDAgMCAxIDAtMy43NyAzLjc5IDMuNzkgMCAwIDEgNS4xNi0xLjM5IDMuNzggMy43OCAwIDAgMS0xLjg5IDcuMDQ0IDMuNzggMy43OCAwIDAgMS0zLjI3LTEuODg0em00Ljg2LTIuODFhMiAyIDAgMCAwLS42Ny0uNjcgMS44NSAxLjg1IDAgMCAwLTIuNTEuNjggMS44NiAxLjg2IDAgMCAwIDAgMS44MyAxLjgzIDEuODMgMCAwIDAgMi4wNy44NSAxLjgyIDEuODIgMCAwIDAgMS4xMS0uODUgMS44OCAxLjg4IDAgMCAwIDAtMS44NHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MyIgZD0iTTcuNDkgMTQuMTVsLTIuOCAyLjI1IDIuODYtMS42NWE0LjA3IDQuMDcgMCAwIDAtLjA2LS42ek04LjE1IDhsLS41OS0zLjZ2My4yOWEzLjQ3IDMuNDcgMCAwIDAgLjU5LjI3em01LjE1IDMuNDdsMy4yMiAxLjQxLTIuODYtMS42NGExLjY5IDEuNjkgMCAwIDAtLjM2LjIzeiIvPiYjeGE7PC9zdmc+;" parent="GuzJ8BqgIlNCJu6hI-l5-1145" vertex="1">
      <mxGeometry width="30" height="28" relative="1" as="geometry">
        <mxPoint x="15" y="16" as="offset" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
`

export const xml_multilayer = `
<mxGraphModel dx="1473" dy="826" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="High-level Architecture" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1" vertex="1" parent="1">
      <mxGeometry x="40" y="20" width="200" height="30" as="geometry" />
    </mxCell>
    <mxCell id="3" value="Azure" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="40" y="60" width="320" height="200" as="geometry" />
    </mxCell>
    <mxCell id="4" value="SAP HANA SRM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
      <mxGeometry x="120" y="120" width="160" height="80" as="geometry" />
    </mxCell>
    <mxCell id="5" value="Mid-level Architecture" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1" vertex="1" parent="1">
      <mxGeometry x="420" y="20" width="200" height="30" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Azure" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="420" y="60" width="320" height="200" as="geometry" />
    </mxCell>
    <mxCell id="7" value="Application Tier" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="440" y="80" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="8" value="Database Tier" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
      <mxGeometry x="600" y="80" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="9" value="SAP HANA" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="520" y="180" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="10" value="Detailed Architecture" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1" vertex="1" parent="1">
      <mxGeometry x="800" y="20" width="200" height="30" as="geometry" />
    </mxCell>
    <mxCell id="11" value="Azure" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="800" y="60" width="320" height="400" as="geometry" />
    </mxCell>
    <mxCell id="12" value="Application Tier" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="820" y="80" width="280" height="120" as="geometry" />
    </mxCell>
    <mxCell id="13" value="Fiori Front-end" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
      <mxGeometry x="830" y="90" width="100" height="40" as="geometry" />
    </mxCell>
    <mxCell id="14" value="SAP Web Dispatcher" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
      <mxGeometry x="970" y="90" width="120" height="40" as="geometry" />
    </mxCell>
    <mxCell id="15" value="Central Services" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
      <mxGeometry x="900" y="150" width="120" height="40" as="geometry" />
    </mxCell>
    <mxCell id="16" value="Database Tier" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
      <mxGeometry x="820" y="220" width="280" height="220" as="geometry" />
    </mxCell>
    <mxCell id="17" value="SAP HANA" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="840" y="240" width="240" height="60" as="geometry" />
    </mxCell>
    <mxCell id="18" value="Azure Load Balancer" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
      <mxGeometry x="840" y="320" width="120" height="40" as="geometry" />
    </mxCell>
    <mxCell id="19" value="Azure Storage" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
      <mxGeometry x="960" y="320" width="120" height="40" as="geometry" />
    </mxCell>
    <mxCell id="20" value="Azure Site Recovery" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
      <mxGeometry x="900" y="380" width="120" height="40" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
`

export const default_aws = `
<mxGraphModel dx="1473" dy="1653" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="UEzPUAAOIrF-is8g5C7q-162" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-148" target="UEzPUAAOIrF-is8g5C7q-144" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="325" y="-674" />
          <mxPoint x="295" y="-674" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-163" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-148" target="UEzPUAAOIrF-is8g5C7q-145" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="325" y="-674" />
          <mxPoint x="455" y="-674" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-166" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-148" target="UEzPUAAOIrF-is8g5C7q-150" edge="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-167" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-148" target="UEzPUAAOIrF-is8g5C7q-154" edge="1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="786" y="-525" as="targetPoint" />
        <Array as="points">
          <mxPoint x="686" y="-525" />
          <mxPoint x="686" y="-525" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-168" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-148" target="UEzPUAAOIrF-is8g5C7q-149" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="346" y="-643" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-170" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-150" target="UEzPUAAOIrF-is8g5C7q-151" edge="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-171" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-151" target="UEzPUAAOIrF-is8g5C7q-152" edge="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-169" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-153" target="UEzPUAAOIrF-is8g5C7q-148" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="346" y="-394" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-174" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;startArrow=none;startFill=0;endArrow=open;endFill=0;strokeColor=#808080;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-161" target="UEzPUAAOIrF-is8g5C7q-153" edge="1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1025" y="-394" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-144" value="Amazon CloudWatch" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch;labelBackgroundColor=#ffffff;spacingTop=5;" parent="1" vertex="1">
      <mxGeometry x="256" y="-794" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-145" value="Amazon SNS" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sns;labelBackgroundColor=#ffffff;spacingTop=5;" parent="1" vertex="1">
      <mxGeometry x="416" y="-794" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-148" value="Lambda" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F78E04;gradientDirection=north;fillColor=#D05C17;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lambda;labelBackgroundColor=#ffffff;spacingTop=8;" parent="1" vertex="1">
      <mxGeometry x="286" y="-564" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-149" value="Amazon DynamoDB" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#4D72F3;gradientDirection=north;fillColor=#3334B9;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.dynamodb;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="616" y="-682.5" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-150" value="Amazon SQS Queue" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#BC1356;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.queue;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="286" y="-384" width="78" height="47" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-151" value="Lambda&lt;br&gt;Function&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#D05C17;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.lambda_function;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="286" y="-244" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-152" value="Amazon CloudWatch" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="486" y="-244" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-153" value="Amazon SNS&lt;br&gt;Topic&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#BC1356;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.topic;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="607" y="-428" width="78" height="67" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-154" value="AWS Cloud" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;strokeColor=#232F3E;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#232F3E;dashed=0;labelBackgroundColor=#ffffff;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;" parent="1" vertex="1">
      <mxGeometry x="796" y="-734" width="320" height="311" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-159" value="Cross-Account&lt;br&gt;Role&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#C7131F;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.role;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="851" y="-576" width="78" height="44" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-160" value="CloudWatch&lt;br&gt;Event&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#BC1356;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.event_event_based;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="986" y="-716" width="78" height="78" as="geometry" />
    </mxCell>
    <mxCell id="UEzPUAAOIrF-is8g5C7q-161" value="Lambda&lt;br&gt;Function&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#D05C17;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.lambda_function;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="986" y="-584" width="78" height="78" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
`

export const azure_images = `
Virtual Machine: img/lib/azure2/compute/Virtual_Machine.svg

Azure SQL Database: img/lib/azure2/databases/SQL_Database.svg

Azure Storage Account: img/lib/azure2/storage/Storage_Accounts.svg

Azure Active Directory: img/lib/azure2/identity/Azure_Active_Directory.svg

Azure App Service: img/lib/azure2/app_services/App_Services.svg

Azure Functions: img/lib/azure2/compute/Function_Apps.svg

Azure Cosmos DB: img/lib/azure2/databases/Azure_Cosmos_DB.svg

Azure Key Vault: img/lib/azure2/security/Key_Vaults.svg

Azure Virtual Network: img/lib/azure2/networking/Virtual_Networks.svg

Azure Load Balancer: img/lib/azure2/networking/Load_Balancers.svg

Azure Kubernetes Service (AKS): img/lib/azure2/containers/Kubernetes_Services.svg

Azure Container Registry: img/lib/azure2/containers/Container_Registries.svg

Azure Logic Apps: img/lib/azure2/integration/Logic_Apps.svg

Azure API Management: img/lib/azure2/app_services/API_Management_Services.svg

Azure Application Gateway: img/lib/azure2/networking/Application_Gateways.svg

Azure Monitor: img/lib/azure2/management_governance/Monitor.svg

Azure Data Factory: img/lib/azure2/databases/Data_Factory.svg

Azure Synapse Analytics: img/lib/azure2/analytics/Azure_Synapse_Analytics.svg

Azure Databricks: img/lib/azure2/analytics/Azure_Databricks.svg

Azure Event Hub: img/lib/azure2/analytics/Event_Hubs.svg

Azure Service Bus: img/lib/azure2/integration/Service_Bus.svg

Azure CDN: img/lib/azure2/app_services/CDN_Profiles.svg

Azure DevOps: img/lib/azure2/devops/Azure_DevOps.svg

Azure Cognitive Services: img/lib/azure2/ai_machine_learning/Cognitive_Services.svg

Azure Machine Learning: img/lib/azure2/ai_machine_learning/Machine_Learning.svg

Azure IoT Hub: img/lib/azure2/iot/IoT_Hub.svg

Azure Data Lake Storage: img/lib/azure2/storage/Data_Lake_Storage_Gen1.svg

Azure Backup: img/lib/azure2/other/Azure_Backup_Center.svg

Azure Site Recovery: img/lib/azure2/management_governance/Recovery_Services_Vaults.svg

Azure Redis Cache: img/lib/azure2/databases/Cache_Redis.svg

Azure Firewall: img/lib/azure2/networking/Firewalls.svg

Azure Application Insights: img/lib/azure2/devops/Application_Insights.svg

Azure Log Analytics: img/lib/azure2/analytics/Log_Analytics_Workspaces.svg

Azure Stream Analytics: img/lib/azure2/analytics/Stream_Analytics_Jobs.svg

Azure Blob Storage: img/lib/azure2/storage/Storage_Accounts_Classic.svg

Azure Queue Storage: img/lib/azure2/general/Storage_Queue.svg

Azure Table Storage: img/lib/azure2/databases/Data_Factory.svg

Azure File Storage: img/lib/azure2/storage/Azure_Fileshare.svg

Azure Data Explorer: img/lib/azure2/databases/Azure_Data_Explorer_Clusters.svg

Azure Bastion: img/lib/azure2/networking/Bastions.svg

Azure Front Door: img/lib/azure2/networking/Front_Doors.svg

Azure Managed Identity: img/lib/azure2/identity/Managed_Identities.svg

Azure Security Center: img/lib/azure2/security/Security_Center.svg

Azure Sentinel: img/lib/azure2/security/Azure_Sentinel.svg

Azure Blueprints: img/lib/azure2/management_governance/Blueprints.svg

Azure Policy: img/lib/azure2/management_governance/Policy.svg

Azure Resource Manager: img/lib/azure2/management_governance/Resource_Graph_Explorer.svg

Azure Automation: img/lib/azure2/management_governance/Automation_Accounts.svg

Azure DNS: img/lib/azure2/networking/DNS_Zones.svg

On Premises Data Center: img/lib/azure2/other/Modular_Data_Center.svg

User: img/lib/active_directory/user.svg

Azure Traffic Manager: img/lib/azure2/networking/Traffic_Manager_Profiles.svg`

export const aws_images = `
EC2 Instance: shape=mxgraph.aws3.ec2

Amazon RDS: shape=mxgraph.aws3.rds

Amazon S3: shape=mxgraph.aws3.s3

AWS IAM: shape=mxgraph.aws3.iam

Amazon VPC: shape=mxgraph.aws3.vpc

Amazon Lambda: shape=mxgraph.aws3.lambda

Amazon DynamoDB: shape=mxgraph.aws4.productIcon; prIcon=mxgraph.aws4.dynamodb;

Amazon CloudFront: shape=mxgraph.aws3.cloudfront

Amazon ELB: shape=mxgraph.aws3d.elasticLoadBalancing

Amazon Route 53: shape=mxgraph.aws3.route_53

Amazon CloudWatch: shape=mxgraph.aws3.instance_with_cloudwatch

Amazon SNS: shape=mxgraph.aws3.sns

Amazon SQS: shape=mxgraph.aws3.sqs

Amazon API Gateway: shape=mxgraph.aws3.api_gateway

Amazon ECS: shape=mxgraph.aws3.ecs

Amazon EKS: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.eks;

Amazon Redshift: shape=mxgraph.aws3.redshift

Amazon ElastiCache: shape=mxgraph.aws3.elasticache

Amazon Elastic Beanstalk: shape=mxgraph.aws3.elastic_beanstalk

Amazon CloudFormation: shape=mxgraph.aws3.cloudformation

Amazon Kinesis: shape=mxgraph.aws3.kinesis

Amazon EMR: shape=mxgraph.aws3.emr

Amazon Glacier: shape=mxgraph.aws3.glacier

Amazon CloudTrail: shape=mxgraph.aws3.cloudtrail

Amazon Cognito: shape=mxgraph.aws3.cognito

Amazon CodeCommit: shape=mxgraph.aws3.codecommit

Amazon CodeBuild: shape=mxgraph.aws3.codebuild

Amazon CodeDeploy: shape=mxgraph.aws3.codedeploy

Amazon CodePipeline: shape=mxgraph.aws3.codepipeline

Amazon Elastic File System: shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_file_system;

Amazon Elastic Block Store: shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_file_system;

Amazon Aurora: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.aurora;

Amazon Neptune: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.neptune;

Amazon DocumentDB: shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.documentdb_with_mongodb_compatibility;

Amazon Athena: shape=mxgraph.aws3.athena

Amazon QuickSight: shape=mxgraph.aws3.quicksight

Amazon SageMaker: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.sagemaker;

Amazon Comprehend: shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sagemaker;

Amazon Rekognition: shape=mxgraph.aws3.rekognition

Amazon Polly: shape=mxgraph.aws3.polly

Amazon Lex: shape=mxgraph.aws3.lex

Amazon Step Functions: shape=mxgraph.aws3.step_functions

Amazon GuardDuty: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.guardduty;

Amazon Inspector: shape=mxgraph.aws3.inspector

Amazon WAF: shape=mxgraph.aws3.waf

Amazon Shield: shape=mxgraph.aws3.shield

Amazon Secrets Manager: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.secrets_manager;

Amazon Key Management Service: shape=mxgraph.aws4.productIcon;prIcon=mxgraph.aws4.key_management_service;

Amazon Certificate Manager: shape=mxgraph.aws3.certificate_manager

Amazon CloudHSM: shape=mxgraph.aws3.cloudhsm`

export const gcp_images = `
Compute Engine: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjAwMDAwMTkwNzM0ODYzMyIgaGVpZ2h0PSIxNi4wMDAwMDE5MDczNDg2MzMiIHZpZXdCb3g9Ii03LjE4NzExMDA2NTA3Mzg4N2UtMTMgLTIuNDg2ODk5MTA5MjkyMjI5N2UtMTUgMTYuMDAwMDAxOTA3MzQ4NjMzIDE2LjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS44NCA1Ljc3SDYuMTZhLjM5LjM5IDAgMCAwLS4zOS4zOXYzLjY4YS4zOS4zOSAwIDAgMCAuMzkuMzloMy42N2EuMzkuMzkgMCAwIDAgLjM5LS4zOVY2LjE2YS4zOS4zOSAwIDAgMC0uMzktLjM5bTUuODItLjI5YS4zNS4zNSAwIDAgMCAuMzUtLjM1di0uNTdhLjM1LjM1IDAgMCAwLS4zNS0uMzVoLTEuNzlWMi41NGEuMzkuMzkgMCAwIDAtLjM5LS4zOUgxMS44Vi4zNWEuMzUuMzUgMCAwIDAtLjM1LS4zNWgtLjU4YS4zNS4zNSAwIDAgMC0uMzUuMzV2MS43OUg4LjYzVi4zNUEuMzUuMzUgMCAwIDAgOC4yOSAwaC0uNThhLjM1LjM1IDAgMCAwLS4zNS4zNXYxLjc5SDUuNDhWLjM1QS4zNS4zNSAwIDAgMCA1LjEzIDBoLS41OGEuMzUuMzUgMCAwIDAtLjM1LjM1djEuNzlIMi41M2EuMzkuMzkgMCAwIDAtLjM5LjM5VjQuMkguMzVhLjM1LjM1IDAgMCAwLS4zNS4zNXYuNThhLjM1LjM1IDAgMCAwIC4zNS4zNWgxLjc5djEuODhILjM1YS4zNS4zNSAwIDAgMC0uMzUuMzV2LjU4YS4zNS4zNSAwIDAgMCAuMzUuMzVoMS43OXYxLjg5SC4zNWEuMzUuMzUgMCAwIDAtLjM1LjM1di41N2EuMzUuMzUgMCAwIDAgLjM1LjM1aDEuNzl2MS42N2EuMzkuMzkgMCAwIDAgLjM5LjM5SDQuMnYxLjc5YS4zNS4zNSAwIDAgMCAuMzUuMzVoLjU4YS4zNS4zNSAwIDAgMCAuMzUtLjM1di0xLjc5aDEuODh2MS43OWEuMzUuMzUgMCAwIDAgLjM1LjM1aC41OGEuMzUuMzUgMCAwIDAgLjM1LS4zNXYtMS43OWgxLjg5djEuNzlhLjM1LjM1IDAgMCAwIC4zNS4zNWguNTdhLjM1LjM1IDAgMCAwIC4zNS0uMzV2LTEuNzloMS42OGEuMzkuMzkgMCAwIDAgLjM5LS4zOVYxMS44aDEuNzlhLjM1LjM1IDAgMCAwIC4zNC0uMzV2LS41N2EuMzUuMzUgMCAwIDAtLjM1LS4zNWgtMS43OVY4LjY0aDEuNzlhLjM1LjM1IDAgMCAwIC4zNS0uMzV2LS41OGEuMzUuMzUgMCAwIDAtLjM1LS4zNWgtMS43OVY1LjQ4em0tMy4xMSA3LjA3SDMuNDVWMy40Nmg5LjA5eiIvPiYjeGE7PC9zdmc+

Cloud Storage: img/lib/clip_art/networking/Cloud_Storage_128x128.png

Cloud Functions: img/lib/gcp2/compute/Cloud_Functions.svg

BigQuery: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+

Cloud SQL: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==

Kubernetes Engine: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5TDQxLjE5IDc0LjgyOFY1MS45OTN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTY1LjM0NCA0MC4yNkw0Ni4xODkgNTEuOTc5djIyLjg0N0w2My4wODggNjQuMjVsMTIuNTM5IDYuOTc0IDIuNjA5LTEuNTA1di0yLjc2NWwtMTIuNzg0LTcuMTEyeiIvPiYjeGE7PC9zdmc+

App Engine: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjA2OTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjEyLjg2OTk5OTg4NTU1OTA4MiIgdmlld0JveD0iMCAxLjc4ODEzOTM0MzI2MTcxODhlLTcgMTYuMDY5OTk5Njk0ODI0MjIgMTIuODY5OTk5ODg1NTU5MDgyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDMuMDVhNC45MSA0LjkxIDAgMSAwIDMuNDcyIDEuNDM4QTQuOTEgNC45MSAwIDAgMCA4IDMuMDVtMCA4LjYzYTMuNzIgMy43MiAwIDAgMSAwLTcuNDQgMy43MiAzLjcyIDAgMSAxIDAgNy40NG03LjctNC4yN2wtMi0uNjRhNS43OCA1Ljc4IDAgMCAxIC4xMyAxLjIyIDUuODcgNS44NyAwIDAgMS0uMDYuODZoMmEuMzYuMzYgMCAwIDAgLjMtLjM0di0uOGEuMzYuMzYgMCAwIDAtLjM3LS4zTTggMi4xOGE1LjgzIDUuODMgMCAwIDEgMS4yLjEybC0uNzMtMmEuMzYuMzYgMCAwIDAtLjM0LS4zaC0uMzFhLjM2LjM2IDAgMCAwLS4zNC4zbC0uNjQgMkE1LjggNS44IDAgMCAxIDggMi4xOE0yLjIyIDcuOTZhNS43OCA1Ljc4IDAgMCAxIC4xMy0xLjIyTC4zIDcuNDFhLjM2LjM2IDAgMCAwLS4zLjN2Ljc3YS4zNi4zNiAwIDAgMCAuMy4zNGgyYTUuNzkgNS43OSAwIDAgMS0uMDYtLjg2bTcuNTEtMS42MWwtLjQ2LjQ2aDBhMS43NyAxLjc3IDAgMCAwLTIuNSAyLjVsLS40Ni40NmEyLjQyIDIuNDIgMCAxIDAgMy40Mi0zLjQybS0xIDIuNGExLjEyIDEuMTIgMCAxIDEgLjMzMS0uNzk1IDEuMTIgMS4xMiAwIDAgMS0uMzMxLjc5NSIvPiYjeGE7PC9zdmc+

Cloud Pub/Sub: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==

Cloud Dataflow: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjExLjUzOTk5OTk2MTg1MzAyNyIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDExLjUzOTk5OTk2MTg1MzAyNyAxNiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxMC42MyIgY3k9IjguMDEiIHI9Ii45MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9Ii45MSIgY3k9IjguMDEiIHI9Ii45MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjUuNzciIGN5PSI2LjY1IiByPSIuOTEiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSI1Ljc3IiBjeT0iOS4zNyIgcj0iLjkxIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTguNTcgMGgtLjAzTDUuNzcgMS42aDAgMEwzIDBoLS4wM0wxLjYyLjc4IDQuNCAyLjM5LjIgNC44djEuN2gxLjQ0di0uOTFsMy40NC0yLjAydjEuNDhoMS4zOFYzLjU3TDkuOSA1LjU5di45MWgxLjQ0VjQuOGwtNC4yLTIuNDFMOS45Mi43OHpNNi40NiAxMC45Nkg1LjA4djEuNDZsLTMuNDQtMi4wMVY5LjVILjJ2MS43bDQuMjEgMi40MS0yLjc5IDEuNjEgMS4zNS43OEgzbDIuNzctMS42TDguNTQgMTZoLjAzbDEuMzUtLjc4LTIuNzktMS42MSA0LjIxLTIuNDFWOS41SDkuOXYuOTFsLTMuNDQgMi4wMXoiLz4mI3hhOzwvc3ZnPg==

Cloud IAM: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=

Cloud Load Balancing: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYgMTBoMnY0aC0yem0tNyAwaDJ2NEg5em0tNyAwaDJ2NEgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05IDVoMnY0SDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIgOWgxNnYySDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMGgxMnY1SDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoNnY1aC02eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6TTAgMTRoNnY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMgMTRoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcgMTRoNnY2SDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDE0aDN2NmgtM3ptNyAwaDN2NmgtM3oiLz4mI3hhOzwvc3ZnPg==

Cloud CDN: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Cloud DNS: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkgNmgydjEwSDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDE3SDB2MmgyMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIgMTZIOHY0aDR6TTAgMGgyMHY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoMTB2NkgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMiAyaDJ2MkgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDhoMjB2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA4aDEwdjZIMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIgMTBoMnYySDJ6Ii8+JiN4YTs8L3N2Zz4=

Virtual Private Cloud: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQgMGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDBoM3Y2aC0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE0aDN2NmgtM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCAwaDZ2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDBoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMTRoNnY2SDB6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0zIDE0aDN2Nkgzek02IDJoOHYySDZ6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik02IDE2aDh2Mkg2ek0xNiA2aDJ2OGgtMnpNMiA2aDJ2OEgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMiA2aDJ2Mkgyem0xNCAwaDJ2MmgtMnpNNiAyaDJ2Mkg2em0wIDE0aDJ2Mkg2eiIvPiYjeGE7PC9zdmc+

Cloud Datastore: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMzAgMjEiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTAgMGwxLjUgMS41aDZMOSAweiIgY2xhc3M9InN0MiIvPiYjeGE7CTxwYXRoIGQ9Ik05IDlWMEw3LjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTAgOWwxLjUtMS41di02TDAgMHoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNOSA5TDcuNSA3LjVoLTZMMCA5eiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTAuNSAwTDEyIDEuNWg2TDE5LjUgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSA5VjBMMTggMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgOUwxMiA3LjV2LTZMMTAuNSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xOS41IDlMMTggNy41aC02TDEwLjUgOXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8cGF0aCBkPSJNMTIgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMjEgMGwxLjUgMS41aDZMMzAgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMzAgOVYwbC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDlsMS41LTEuNXYtNkwyMSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0zMCA5bC0xLjUtMS41aC02TDIxIDl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIyLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMCAxMmwxLjUgMS41aDZMOSAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMXYtOWwtMS41IDEuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0wIDIxbDEuNS0xLjV2LTZMMCAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMWwtMS41LTEuNWgtNkwwIDIxeiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMTMuNWg2djZoLTZ6IiBjbGFzcz0ic3QzIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgMTJsMS41IDEuNWg2bDEuNS0xLjV6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTE5LjUgMjF2LTlMMTggMTMuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xMC41IDIxbDEuNS0xLjV2LTZMMTAuNSAxMnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSAyMUwxOCAxOS41aC02TDEwLjUgMjF6IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTEyIDEzLjVoNnY2aC02em05LTEuNWwxLjUgMS41aDZMMzAgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxdi05bC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDIxbDEuNS0xLjV2LTZMMjEgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxbC0xLjUtMS41aC02TDIxIDIxeiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0yMi41IDEzLjVoNnY2aC02eiIgY2xhc3M9InN0MiIvPiYjeGE7PC9zdmc+

Cloud Spanner: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjQ1OTk5OTA4NDQ3MjY1NiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSIwIDAgMjAgMTguNDU5OTk5MDg0NDcyNjU2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CQkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJCS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTguNjYgNS42M3Y0LjM2bC0zLjc3IDIuMTggMS4zNCAyLjMyTDEwIDEyLjMxbDMuNzcgMi4xOCAxLjM0LTIuMzItMy43Ny0yLjE4VjUuNjN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDUuNjN2NS4xMmwtNC40NCAyLjU4LjY3IDEuMTZMMTAgMTIuMzFsMy43NyAyLjE4IDEuMzQtMi4zMi0zLjc3LTIuMThWNS42M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNi42MiA0Ljk1TDEwIDYuNzhWMy42N2wtMS4zNS0uNjJWMEw2LjYyIDEuMjJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDYuNzhsMy4zOC0xLjgzVjEuMjJMMTEuMzUgMHYzLjA1TDEwIDMuNjd6bTYuMTQgNy41M2wtLjA4IDEuMzkgMi43IDEuNTMtMi4xOCAxLjItMy4yNC0xLjg3LjExLTMuODMgMy4yNy0yTDIwIDEyLjYxdjIuNDlsLTIuNjktMS41NXptLTEyLjI4IDBsLTEuMTctLjc2TDAgMTUuMXYtMi40OWwzLjIzLTEuODcgMy4yNyAyIC4xMSAzLjgzLTMuMTkgMS44OS0yLjE4LTEuMjMgMi43LTEuNTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2LjcyIDEwLjc1bC0zLjI3IDIuMDEgMi42OSAxLjU1IDEuMTYtLjc2TDIwIDE1LjFsLS4wNS0yLjQ5ek0zLjg2IDE0LjMxbDIuNjktMS41NS0zLjI3LTIuMDEtMy4yMyAxLjg2TDAgMTUuMWwyLjctMS41NXoiLz4mI3hhOzwvc3ZnPg==

Cloud Memorystore: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxLjk0aDMuMzN2Mi41OEgwem0wIDQuNTFoMy4zM3YyLjU4SDB6bTAgNC41MmgzLjMzdjIuNThIMHptMCA0LjUxaDMuMzN2Mi41OEgwek0xNi42NyAxLjk0SDIwdjIuNThoLTMuMzN6bTAgNC41MUgyMHYyLjU4aC0zLjMzem0wIDQuNTJIMjB2Mi41OGgtMy4zM3ptMCA0LjUxSDIwdjIuNThoLTMuMzN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjY3IDEuOTRsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU4aC0yLjY2em0wIDQuNTJsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU5aC0yLjY2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuMzMgMjBoMTMuMzRWMEgzLjMzem02LTlINmw0LjY3LTcuNzRWOUgxNGwtNC42NyA3Ljc0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0IDkuMDNoLTMuMzNWMGg2djIwSDkuMzN2LTMuMjN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Cloud Firestore: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyMy45MDU2MTAzOTg2NzUxNSIgaGVpZ2h0PSIzNzYuNDIyMjk0OTYzNjg0MDciIHZpZXdCb3g9Ii0wLjA5NzAwMDAwMjg2MTAyMjk1IDAuMjg3OTk5OTg3NjAyMjMzOSA4NS42OTk5OTY5NDgyNDIxOSA5OS41OTUwMDEyMjA3MDMxMiI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLS4wOTcgNzUuODE1VjU1Ljg3NGw0Mi44NS0yMC4xODN2MTkuMDd6bTAtMzUuNDAzVjIwLjQ3MUw0Mi43NTMuMjg4djE5LjA3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NS42MDMgNzUuODE1VjU1Ljg3NGwtNDIuODUtMjAuMTgzdjE5LjA3em0wLTM1LjQwM1YyMC40NzFMNDIuNzUzLjI4OHYxOS4wN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDIuNzUzIDgwLjMxNGwxNi4yMTctNy41MjUgMjEuMDg0IDkuNzE3LTM3LjMwMSAxNy4zNzd6Ii8+JiN4YTs8L3N2Zz4=

Cloud Vision API: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTEwIDE2TDAgOGg0bDYgNC45OXoiLz4mI3hhOwkJPHBhdGggZD0iTTIwIDhsLTEwIDh2LTMuMDFMMTYgOHoiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMCAzLjAxTDQgOEgwbDEwLTh6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA4TDEwIDB2My4wMUwxNiA4eiIvPiYjeGE7CTwvZz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxMCIgY3k9IjgiIHI9IjIiLz4mI3hhOzwvc3ZnPg==

Cloud Natural Language API: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUgMmgzdjEyaC0zdjJoMyAydi0yVjIgMGgtMi0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOCAydjFsMi0xem0yIDEydi0xbC0yIDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMTRIMlYyaDNWMEgyIDB2MiAxMiAyaDIgM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxNHYtMWwyIDF6TTIgMnYxTDAgMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNSA3aDEwdjJINXptMCAzaDEwdjJINXptMC02aDEwdjJINXoiLz4mI3hhOzwvc3ZnPg==

Cloud Translation API: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjAgMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE1LjkxIDcuMmgtMS44MkwxMCAxOGgxLjgybDEtMi43aDQuMzJsMSAyLjdIMjB6bS0yLjM5IDYuM0wxNSA5LjZsMS40OCAzLjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjc5IDExLjc3TDguNDggOS41MWgwYTE1LjYyIDE1LjYyIDAgMCAwIDMuNC01LjkxaDIuNjdWMS44SDguMThWMEg2LjM2djEuOEgwdjEuNzloMTAuMTVhMTQuMDYgMTQuMDYgMCAwIDEtMi44OCA0LjgyIDE0LjU1IDE0LjU1IDAgMCAxLTIuMS0zSDMuMzVhMTYgMTYgMCAwIDAgMi43MSA0LjFMMS40NCAxNGwxLjI5IDEuMyA0LjU0LTQuNSAyLjgzIDIuOHoiLz4mI3hhOzwvc3ZnPg==

Cloud Speech-to-Text:data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDBoMnYyMEg4ek00IDZoMnY4SDR6bTggMGgydjhoLTJ6TTAgM2gydjE0SDB6bTE2IDBoMnYxNGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOCAwaDJ2MTBIOHpNNCA2aDJ2NEg0em04IDBoMnY0aC0yek0wIDNoMnY3SDB6bTE2IDBoMnY3aC0yeiIvPiYjeGE7PC9zdmc+

Cloud Text-to-Speech:data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMDQ2MzQ4NTcxNzc3MyIgaGVpZ2h0PSIxNi42MzE1MTU1MDI5Mjk2ODgiIHZpZXdCb3g9IjAgMC4wMDAyNDE0MDk2NTI1MTcxNzcxNiAyMC4wMDA0NjM0ODU3MTc3NzMgMTYuNjMxNTE1NTAyOTI5Njg4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLjAxIDMuMzA2aDYuNjR2MS42N0guMDF6bS0uMDEgMTBoMCA5LjE3di0xLjY3SDB6bTAtNC4xN2g0LjE4SDEwbC0xLjY3LTEuNjZIMi41MSAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA1LjM4NmEuNDIuNDIgMCAwIDEgLjQyLS4zNi40MS40MSAwIDAgMSAuNDEuMzZ2OS4xOGEyLjA5IDIuMDkgMCAwIDAgMi42MSAyIDIuMTYgMi4xNiAwIDAgMCAxLjU2LTIuMTFWMi4wNjZhLjQuNCAwIDAgMSAuMTktLjQuNDEuNDEgMCAwIDEgLjQ1IDAgLjQuNCAwIDAgMSAuMTkuNHY5LjE2YTIuMDcgMi4wNyAwIDAgMCAuODEgMS42NCAyIDIgMCAwIDAgMS44LjM3IDIuMTYgMi4xNiAwIDAgMCAxLjU2LTIuMTJ2LTIuOGgtMS42N3YyLjkyYS40LjQgMCAwIDEtLjE5LjQuNDEuNDEgMCAwIDEtLjQ1IDAgLjQuNCAwIDAgMS0uMTktLjR2LTkuMTdhMi4wOSAyLjA5IDAgMCAwLTIuNjEtMiAyLjE2IDIuMTYgMCAwIDAtMS41NiAyLjEzdjEyLjM3YS40LjQgMCAwIDEtLjE5LjQuNDEuNDEgMCAwIDEtLjQ1IDAgLjQuNCAwIDAgMS0uMTktLjR2LTkuMTdhMi4wNyAyLjA3IDAgMCAwLTQuMTEtLjM2IDIuNCAyLjQgMCAwIDAtLjA1LjQ2djJMMTAgOS4xMzZ6Ii8+JiN4YTs8L3N2Zz4=

Cloud IoT Core:data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjcwNjUzMTUyNDY1ODIwMyIgaGVpZ2h0PSIxOS45ODM4MjE4Njg4OTY0ODQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iLTAuMDAwMjA5NTQ2OTY4MTA4MDQzMDcgMC4wMDAxNzcyNDA4Mjg2MzQyMzk3MyAxOS43MDY1MzE1MjQ2NTgyMDMgMTkuOTgzODIxODY4ODk2NDg0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMzQ1IDEwLjM5NnYtNC40M2gwYTEuMTQgMS4xNCAwIDAgMC0uNS0yLjE2NCAxLjE0IDEuMTQgMCAwIDAtLjUgMi4xNjR2NC40MmgtNC4yN3YtMi44MmExLjE0IDEuMTQgMCAwIDAtLjUzLTIuMTUgMS4xNCAxLjE0IDAgMCAwLS41MiAyLjE1djIuODNoLS4yMmEzLjgyIDMuODIgMCAwIDEtMi43MjItNi40ODUgMy44MiAzLjgyIDAgMCAxIDQuMTIyLS44OTUgNS4yMiA1LjIyIDAgMCAxIDkuNDQtLjA1IDQgNCAwIDAgMSAxLjIzLS4yaDBhMy44MyAzLjgzIDAgMSAxIDAgNy42NmgtLjI1di0yLjg2YTEuMTQgMS4xNCAwIDAgMC0uNTMtMi4xNDkgMS4xNCAxLjE0IDAgMCAwLS41MyAyLjE0OXYyLjgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjA3NSAxMy4zNTZhMiAyIDAgMCAxIDEuNTQgMiAyLjA3IDIuMDcgMCAwIDEtNC4xMS4zNTQgMi4wNyAyLjA3IDAgMCAxIDEuNTItMi4zNTR2LTIuOTZoMXptLS41MyAzYTEgMSAwIDEgMCAwLTIgMSAxIDAgMSAwIDAgMnptMTEuMDgtM2EyLjA3IDIuMDcgMCAwIDEtLjUzIDQuMDcxIDIuMDcgMi4wNyAwIDAgMS0uNTMtNC4wNzF2LTIuOTVoMS4wNnptLS41MyAzYTEgMSAwIDAgMCAuMzktMS45NCAxIDEgMCAwIDAtMS4yNjggMS4zMDcgMSAxIDAgMCAwIC44NzguNjMzem0tNC43NS0uNDNoMGEyLjA2IDIuMDYgMCAwIDEtLjUgNC4wNTggMi4wNiAyLjA2IDAgMCAxLS41LTQuMDU4di01LjVoMS4wNnptLS41NCAzYTEgMSAwIDAgMCAuNTUtMS44MzIgMSAxIDAgMCAwLTEuNDggMS4yMTIgMSAxIDAgMCAwIC45My42eiIvPiYjeGE7PC9zdmc+

Cloud Dataprep: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjI3OTk5ODc3OTI5Njg3NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMS4yNDYyOTA4MDM4OTEyNzAxZS04IDAgMTguMjc5OTk4Nzc5Mjk2ODc1IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcuNjMgOWEuOTEuOTEgMCAxIDEtLjY0My4yNjdBLjkxLjkxIDAgMCAxIDcuNjMgOXptMC0uOGExLjcxIDEuNzEgMCAxIDAgMS43IDEuNzEgMS43IDEuNyAwIDAgMC0xLjctMS43MXpNMS43MiA5YS45MS45MSAwIDEgMS0uNjQzLjI2N0EuOTEuOTEgMCAwIDEgMS43MiA5em0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjcgMS43MSAxLjcgMS43IDAgMCAwLTEuNy0xLjcxem0zLjA0IDYuMTFhLjkxLjkxIDAgMSAxIDAgMS44Mi45MS45MSAwIDEgMSAwLTEuODJ6bTAtLjc5YTEuNzEgMS43MSAwIDEgMCAxLjIuNSAxLjcgMS43IDAgMCAwLTEuMi0uNXptMC05LjczYS45MS45MSAwIDAgMS0uMDQgMS44MTkuOTEuOTEgMCAwIDEtLjktLjkwOS45Mi45MiAwIDAgMSAuOTQtLjkxem0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjIuNUExLjcgMS43IDAgMCAwIDQuNzYgM3oiLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTTcuODEgMGgxLjY4djIwSDcuODF6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMy40IDIuODdIOC44OWEuMzcuMzcgMCAwIDAtLjMuNHYyLjgyYS4zNi4zNiAwIDAgMCAuMy4zOWg0LjUxYS4zNi4zNiAwIDAgMCAuMzEtLjM5VjMuMjhhLjM3LjM3IDAgMCAwLS4zMS0uNDF6bTQuMzIgNS4yOUg5LjRjLS4zMSAwLS41Ni4xOC0uNTYuMzl2Mi44MmMwIC4yMi4yNS40LjU2LjRoOC4zMmMuMzEgMCAuNTYtLjE5LjU2LS40VjguNTVjMC0uMjItLjI1LS4zOS0uNTYtLjM5em0tNS45MSA1LjI4SDguMjhjLS4xMyAwLS4yMy4xOC0uMjMuMzl2Mi44MmMwIC4yMi4xLjM5LjIzLjM5aDMuNTNjLjEzIDAgLjI0LS4xOC4yNC0uMzl2LTIuODJjLS4wMS0uMjItLjExLS4zOS0uMjQtLjM5eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==

Cloud Composer: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY0MDAwMDM0MzMyMjc1NCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjY0MDAwMDM0MzMyMjc1NCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGgxNC42M3YzLjk0aC01LjN2NS4zM0g1LjM1VjMuOTZIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy45NSAxMC42N2g1LjM0VjIwSDUuMzV2LTUuMzVIMFY1LjM3aDMuOTV6TTE0LjY0IDIwSDEwLjdWNS4zNmgzLjk0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDE2LjA2aDMuOTJWMjBIMHoiLz4mI3hhOzwvc3ZnPg==

Cloud Data Fusion: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny4wNDk2OTgzMjc3ODkyNiIgaGVpZ2h0PSIzNzcuMjkxNTcwNzE1Nzg5NzYiIHZpZXdCb3g9IjAuMTMxMDAwNTE4Nzk4ODI4MTIgLTAuMTIxMDAwMDA2Nzk0OTI5NSA5OS43NjEwMDE1ODY5MTQwNiA5OS44MjQ5OTY5NDgyNDIxOSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODAuNTkzIDE5LjE4djIwLjE5OWgxOS4yOTlWOS41M2MwLTIuNTM3LS45NzktNC44NDYtMi41OC02LjU2OHptLTkuOTA4IDYxLjIyNUgxOS40MzFMMy40NSA5Ny4zMzdjMS42OTUgMS40NzQgMy45MDggMi4zNjcgNi4zMzEgMi4zNjdoNzAuNTU1YzIuODczIDAgNS40NTMtMS4yNTYgNy4yMjEtMy4yNDh6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg3LjU3MyA5Ni40MzdjMS41MDEtMS43MDEgMi40MTMtMy45MzUgMi40MTMtNi4zODJWNjAuMjA0SDcwLjY4NXYyMC4yMDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE5LjQzMSA4MC40MDVWMjkuMzRoMjAuNTc4VjEwLjA0SDkuNzgxYy01LjMzIDAtOS42NSA0LjMyMS05LjY1IDkuNjV2NzAuMzY1Yy4wMDEgMi45MDYgMS4yODYgNS41MTMgMy4zMiA3LjI4MXptNzcuODgtNzcuNDQzQzk1LjU1IDEuMDY2IDkzLjAzNi0uMTIgOTAuMjQ0LS4xMjFINTkuOTUxVjE5LjE4aDIwLjY0M3oiLz4mI3hhOzwvc3ZnPg==

Cloud Dataproc: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjM2MzAxMjMxMzg0Mjc3MyIgaGVpZ2h0PSIxNy45NzU1MjY4MDk2OTIzODMiIHZpZXdCb3g9IjAuMDAwNTYwMDI1NjI2MzI3ODQyNSAwLjYxOTYyOTc0MDcxNTAyNjkgMTkuMzYzMDEyMzEzODQyNzczIDE3Ljk3NTUyNjgwOTY5MjM4MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAgc3QxIj4mI3hhOwkJPHBhdGggZD0iTTQuNjkgMTYuNGwxMC4xOS01Ljg5Ljk3IDEuNjktMTAuMTggNS44OHoiLz4mI3hhOwkJPHBhdGggZD0iTTcuNSA0LjR2MTAuMzVsLTEuODcgMS40MVY0LjR6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNy40OSAxMS4ybC0uOTcgMS42OC04Ljk2LTUuMTktLjI2LTIuMzZ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAgc3QyIiBkPSJNMTIuMzkgOC4yNkw3LjMgNS4zM2wuMjYgMi4zNiAxLjUxLjg2YTQgNCAwIDAgMCAzLjMyLS4yOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MSIgZD0iTTYuMTMgNi4yOWgwYTMuNzggMy43OCAwIDAgMSA1LjE2NS01LjE2M0EzLjc4IDMuNzggMCAwIDEgOS40IDguMThhMy44IDMuOCAwIDAgMS0zLjI3LTEuODl6TTExIDMuNDlhMS44NCAxLjg0IDAgMCAwLTEuNTktLjkyQTEuODMgMS44MyAwIDAgMCA3LjU3IDQuNGExLjg0IDEuODQgMCAwIDAgMi43OTQgMS43MDZBMS44NCAxLjg0IDAgMCAwIDExLjI0IDQuNGExLjggMS44IDAgMCAwLS4yNC0uOTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDIiIGQ9Ik01LjYzIDEwLjk0djUuMjJsMS44Ny0xLjQxdi0xLjYzYTMuMjkgMy4yOSAwIDAgMC0xLjg3LTIuMTh6bTUuNyAzLjg3bDQuNTItMi42MS0yLjIxLTEtMS4yNS44YTQuMjMgNC4yMyAwIDAgMC0xLjA2IDIuODZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDEiIGQ9Ik0uNTEgMTYuN2gwYTMuNzcgMy43NyAwIDAgMSAxLjM4LTUuMTYgMy43MiAzLjcyIDAgMCAxIDIuODYtLjM4QTMuNzggMy43OCAwIDEgMSAuNTEgMTYuN3ptNC44NS0yLjgxQTEuNzkgMS43OSAwIDAgMCA0LjI1IDEzYTEuODMgMS44MyAwIDAgMC0yLjA2IDIuNjloMGMuMzI5LjU2Ni45MzQuOTE0IDEuNTg5LjkxM2ExLjgzIDEuODMgMCAwIDAgMS41ODUtLjkyYy4zMjYtLjU2OC4zMjQtMS4yNjctLjAwNC0xLjgzM3ptNi45NyAyLjQ3aDBhMy43OSAzLjc5IDAgMCAxIDAtMy43NyAzLjc5IDMuNzkgMCAwIDEgNS4xNi0xLjM5IDMuNzggMy43OCAwIDAgMS0xLjg5IDcuMDQ0IDMuNzggMy43OCAwIDAgMS0zLjI3LTEuODg0em00Ljg2LTIuODFhMiAyIDAgMCAwLS42Ny0uNjcgMS44NSAxLjg1IDAgMCAwLTIuNTEuNjggMS44NiAxLjg2IDAgMCAwIDAgMS44MyAxLjgzIDEuODMgMCAwIDAgMi4wNy44NSAxLjgyIDEuODIgMCAwIDAgMS4xMS0uODUgMS44OCAxLjg4IDAgMCAwIDAtMS44NHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MyIgZD0iTTcuNDkgMTQuMTVsLTIuOCAyLjI1IDIuODYtMS42NWE0LjA3IDQuMDcgMCAwIDAtLjA2LS42ek04LjE1IDhsLS41OS0zLjZ2My4yOWEzLjQ3IDMuNDcgMCAwIDAgLjU5LjI3em01LjE1IDMuNDdsMy4yMiAxLjQxLTIuODYtMS42NGExLjY5IDEuNjkgMCAwIDAtLjM2LjIzeiIvPiYjeGE7PC9zdmc+

Cloud Data Catalog: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ni4yNzQ4ODc3NTcyNjMyIiBoZWlnaHQ9IjMzOS42NzM1NDQyMTc3NjM4MyIgdmlld0JveD0iMC4xMTQwMDAwMDAwNTk2MDQ2NCAtMC4wOTAwMDAwMDM1NzYyNzg2OSA5OS41NTU5OTk3NTU4NTkzOCA4OS44NzE5OTQwMTg1NTQ2OSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ny41MjMgNDMuMzk3bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek01MC4zMTItLjA5bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek0yMy4xIDQzLjM5N2wxMi44NDQgNy41NzJ2MTQuNzY3TDIzLjEgNzIuNDE3em02OS40Ny0uNTExbDcuMS0xMS4xNjktMTIuNjY2LTIxLjU5NEg3MC42NDR2OS41aDEwLjkxOWw2Ljk3NyAxMS44OTUtNC4yNTYgNi42OTR6bS03Ni45NzktNC42TDExLjMgMzEuNDg1bDcuMjY0LTExLjg2MWg5Ljk3OWwuMDk5LTkuNUgxMy4yNDFMLjExNCAzMS41NjFsMS41NzYgMi40OTggNS41MTUgOC43Mzl6bTEzLjY2MiAzOS40NDlsNy42MDMgMTIuMDQ3aDI1LjkwMmw3LjczMy0xMi4xNjQtOC4xNDMtNC44OTktNC44MDggNy41NjRINDIuMDk1bC00Ljc0LTcuNTExeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Ny41MjMgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4ek01MC4zMTItLjA5TDM3LjQ2OCA3LjQ4MnYxNC43NjdsMTIuODQ0IDYuNjh6TTIzLjEgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4eiIvPiYjeGE7PC9zdmc+

Cloud Monitoring: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+

Cloud Logging: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMjAgMTkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTQgOWg0djJINHptLTIgN2g2djJIMnoiLz4mI3hhOwkJPHBhdGggZD0iTTQgNEgydjEyaDJ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMCAxSDd2NGgxM3ptMCA3SDd2NGgxM3ptMCA3SDd2NGgxM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNiAwSDB2Nmg2eiIvPiYjeGE7PC9zdmc+

Cloud Trace: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4SDEwdjRoMTB6bTAgOEgxMHY0aDEweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxNkg2djRoNHpNMCAwaDZ2NEgwem0wIDhoMTB2NEgweiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+

Cloud Debugger: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjEyMDAwMDgzOTIzMzQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNi4xMjAwMDA4MzkyMzM0IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyLjEyIDJ2MmgydjJoMlYyek0wIDZoMi4xMlY0aDJWMmgtNHY0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi4xMiA2VjJsLTIgMnYyem0tMiAzbC04IDExVjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYuMTIgOC4xMmw0IDIuODgtNCA1LjAzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMC4xMiAwdjExaC04eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4xMiAxNmgydi0yaDJ2NGgtNHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMi4xMiAxNnYtMmgtMnY0aDQuMTMtLjEzdi0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yLjEyIDE2di0yaC0ydjR6Ii8+JiN4YTs8L3N2Zz4=

Cloud Build: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjMyOTk5OTkyMzcwNjA1NSIgaGVpZ2h0PSIxOS42MTAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAgMCAxNy4zMjk5OTk5MjM3MDYwNTUgMTkuNjEwMDAwNjEwMzUxNTYyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLjE4IDcuOThMMTEgNy4yOWwtMy41MiA2LjEgMS4xOC42OCAzLjUyLTIuMDN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuMzIgMTIuNzJsMy41My02LjA5LTEuMTktLjY5LTMuNTIgMi4wNHY0LjA2eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zLjc1IDcuOThMMCA1LjgxdjkuMmw3Ljk3IDQuNnYtNC4zM2wtNC4yMi0yLjQ0em05LjEzLTEuMmwzLjc2LTIuMTdMOC42NiAwIC42OCA0LjYxbDMuNzYgMi4xNyA0LjIyLTIuNDR6TTkuMzUgMTkuNjFsNy45OC00LjZ2LTkuMmwtMy43NiAyLjE3djQuODZsLTQuMjIgMi40NHoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==

Cloud Source Repositories: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Container Registry: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Cloud Endpoints: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDE5Ljk1MDAwMDc2MjkzOTQ1MyAxMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02IDZsMSAyaDZsMS0yLTEtMkg3eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjUxIDRIN0w2IDZoOGwtMS0yeiIgZmlsbD0iI2FlY2JmYSIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi45NyA2bDEuNS0yLjI1TDE2IDBoLTN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ljk3IDZoMEwxMyAxMmgzbDMuOTUtNi0xLjQ4LTIuMjV6IiBmaWxsPSIjYWVjYmZhIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuOTggNmwtMS41IDIuMjVMMy45NSAxMmgzeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjk4IDZoMGwzLjk3LTZoLTNMMCA2bDEuNDggMi4yNXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==

Apigee API Platform: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjE4MDIzMTA5NDM2MDM1IiBoZWlnaHQ9IjIwLjE4MDIwODIwNjE3Njc1OCIgdmlld0JveD0iLTAuMDAwMTE1MTY1MTIzMTMzOTIwMTMgLTAuMDAwMTAzMzQ0NDkzMjU0NTUzNTMgMjAuMTgwMjMxMDk0MzYwMzUgMjAuMTgwMjA4MjA2MTc2NzU4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNDI4NWY0fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMjkgMTAuMDlsMS4zMi0xLjMyLTEuNzktMS43OWEyLjk0IDIuOTQgMCAwIDEgMi4wOC01IDIuOTIgMi45MiAwIDAgMSAyLjA3Ljg2bDEuOCAxLjc5IDEuMzItMS4zNEw4LjMgMS41YTQuODEgNC44MSAwIDEgMC02LjggNi44em0xMy42IDBsLTEuMzIgMS4zMiAxLjc5IDEuOGEyLjk0IDIuOTQgMCAwIDEtNC4xNiA0LjE1bC0xLjc5LTEuNzktMS4zMiAxLjMyIDEuNzkgMS43OWE0LjgxIDQuODEgMCAxIDAgNi44LTYuOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNi45OCAxNy4zNmEyLjk0IDIuOTQgMCAxIDEtNC4xNi00LjE2bDEuNzktMS43OSA0LjE2IDQuMTZ6bTYuMjMtMTQuNTRhMi45MyAyLjkzIDAgMCAxIDUgMi4wOCAzIDMgMCAwIDEtLjg2IDIuMDhsLTEuNzkgMS43OS00LjE1LTQuMTZ6bS0zLjEyIDEwLjQ2YTMuMiAzLjIgMCAwIDEtMy4xOS0zLjE5aDBhMy4yMSAzLjIxIDAgMCAxIDMuMTktMy4xOWgwYTMuMjEgMy4yMSAwIDAgMSAzLjE5IDMuMTloMGEzLjIgMy4yIDAgMCAxLTMuMTkgMy4xOXptNi44LTMuMTlsMS43OS0xLjc5QTQuODEgNC44MSAwIDAgMCAxNi41NzQuMTUzIDQuODEgNC44MSAwIDAgMCAxMS44OCAxLjVsLTEuNzkgMS43OS02LjggNi44LTEuNzkgMS43OWE0LjgxIDQuODEgMCAwIDAgMi4xMDYgOC4xNDdBNC44MSA0LjgxIDAgMCAwIDguMyAxOC42OGwxLjc5LTEuNzl6Ii8+JiN4YTs8L3N2Zz4=

Cloud Security Command Center: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjE4MDAwMDMwNTE3NTc4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTcuMTgwMDAwMzA1MTc1NzggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LjkgNC44NWE1LjIzIDUuMjMgMCAwIDEgMy43NSAzLjc1aDMuNTNWMy4yNEw5LjkgMHpNMy41MiA4LjYxYTUuMjIgNS4yMiAwIDAgMSAzLjc1LTMuNzVWMEwwIDMuMjR2NS4zN3pNNy4yOCAxNWE1LjIzIDUuMjMgMCAwIDEtMy43NS0zLjc1SC4yMkExMiAxMiAwIDAgMCA3LjI4IDIwem02LjM4LTMuNzVBNS4yMyA1LjIzIDAgMCAxIDkuOTEgMTV2NWExMiAxMiAwIDAgMCA3LjA1LTguNzV6Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iOC41OSIgY3k9IjkuOTIiIHI9IjIuNjMiLz4mI3hhOzwvc3ZnPg==

Cloud Key Management Service: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxMC43NzU2MDY1NDM4NjAyNSIgaGVpZ2h0PSIzNzcuOTUzMDI4ODM1NTI1NDYiIHZpZXdCb3g9Ii0wLjE0MDAwMDAwMDU5NjA0NjQ1IC0wLjQ2NzAwMDAwNzYyOTM5NDUzIDgyLjIyNTk5NzkyNDgwNDY5IDEwMC4wMDAwMDc2MjkzOTQ1MyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNmZmY7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAuOTczLS40NjdsNDEuMTEzIDE3LjQ5M3YyOS42NTRjMCAyNy40MTgtMjQuNjA4IDUwLjgzNi00MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MC45NzMtLjQ2N0wtLjE0IDE3LjAyNXYyOS42NTRjMCAyNy40MTggMjQuNjA4IDUwLjgzNiA0MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MS4yNTMgMTYuNjA1Yy05LjU4NCAwLTE3LjQ0NSA3Ljg2Mi0xNy40NDUgMTcuNDQ1IDAgOC4wODQgNS41OTQgMTQuOTQyIDEzLjA5NiAxNi44OTF2OS40ODhoLTkuODY5djguNzAxaDkuODY5djUuMzc3aC02LjMxNXY4LjcwMWg2LjMxNXYyLjE5N2g4LjcwMVY1MC45NDFDNTMuMTA2IDQ4Ljk5MiA1OC43IDQyLjEzNCA1OC43IDM0LjA1YzAtOS41ODQtNy44NjMtMTcuNDQ1LTE3LjQ0Ny0xNy40NDV6bTAgOC42OTlBOC42OCA4LjY4IDAgMCAxIDUwIDM0LjA1YTguNjggOC42OCAwIDAgMS04Ljc0OCA4Ljc0NiA4LjY4IDguNjggMCAwIDEtOC43NDYtOC43NDYgOC42OCA4LjY4IDAgMCAxIDguNzQ2LTguNzQ2eiIvPiYjeGE7PC9zdmc+

Cloud Identity-Aware Proxy: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Cloud Data Loss Prevention: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Cloud Identity: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==

Cloud Armor: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjUwMDQzNDg3NTQ4ODI4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSItMC4wMDAzNjMwODkyNjA2NDUyMTA3NCAxLjE5MjA5Mjg5NTUwNzgxMjVlLTcgMTYuNTAwNDM0ODc1NDg4MjggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMC40MiAxMi4wN2wxLjA0IDEuMDUtNS40NSA1LjQ4LTEuMDQtMS4wNXptLS44My00LjE5bDEuMDQgMS4wNS03LjM1IDcuMzktMS4wNC0xLjA1em0tNC4xNi0uODVsMS4wNCAxLjA1LTQuODggNC45LTEuMDQtMS4wNXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTguMjUgMS42MWw2Ljc4IDN2NC41NWE5LjcxIDkuNzEgMCAwIDEtNi43OCA5LjMyIDkuNyA5LjcgMCAwIDEtNi43OC05LjMxVjQuNjNsNi43OC0zbTAtMS42M0wwIDMuNjh2NS40OUExMS4xNyAxMS4xNyAwIDAgMCA4LjEgMjBoLjE1LjE1YTExLjE3IDExLjE3IDAgMCAwIDguMS0xMC43OFYzLjY4eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMC45NCIgY3k9IjEyLjYyIiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjEwLjEiIGN5PSI4LjQ1IiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjUuOTQiIGN5PSI3LjYiIHI9IjEuNDIiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=

Cloud Interconnect: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxOCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00IDhIMHYyaDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMgNGgxMHYxMEgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4aC00LjY3djJIMjB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1IDJ2MTRINnYyaDExdi0yVjIgMEg2djJ6TTggNGg1djEwSDh6Ii8+JiN4YTs8L3N2Zz4=

Cloud VPN: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE3Ljk1MDAwMDc2MjkzOTQ1MyAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMS43IDkuMjhoNC4xOHYxLjM4SDExLjd6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNC45MiA0LjEyaDEuMzh2MTEuNzFoLTEuMzh6Ii8+JiN4YTsJPC9nPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cmVjdCB4PSIxMy4yNyIgeT0iMTUuMzIiIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwkJPHJlY3QgeD0iMTMuMjciIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwk8L2c+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuOTUgOS4yOGg0LjI4djEuMzhIMy45NXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHJlY3QgeT0iNy42MyIgd2lkdGg9IjQuNjgiIGhlaWdodD0iNC42OCIgcng9Ii4yOCIvPiYjeGE7CQk8cGF0aCBkPSJNOS45NyAxMi4xN2EyLjIgMi4yIDAgMSAxIDAtNC40IDIuMiAyLjIgMCAwIDEgMi4yIDIuMiAyLjE5IDIuMTkgMCAwIDEtMi4yIDIuMnptMC0zLjU3YTEuMzggMS4zOCAwIDAgMC0xLjA1IDIuMzNBMS4zOCAxLjM4IDAgMCAwIDExLjMgMTBhMS4zNyAxLjM3IDAgMCAwLTEuMzMtMS40eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==

Cloud Router: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDEydjNsLTUtNSA1LTV2M2gzdjR6TTMgOEgwdjRoM3YzbDUtNS01LTV6bTkgN3YtM0g4djNINWw1IDUgNS01em0wLTEwdjNIOFY1SDVsNS01IDUgNXoiLz4mI3hhOzwvc3ZnPg==
`
export const sample_azure_element = `
    " <mxCell id="Lii4eqc5pyUN3i6dcaNs-13" value="All Resources" 
    style="image;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=img/lib/azure2/general/All_Resources.svg;" 
    vertex="1" parent="1">"
`
export const sample_aws_element = `
    " <mxCell id="8" value="PostgreSQL RDS" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#4D72F3;gradientDirection=north;fillColor=#3334B9;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws3.rds;" parent="3" vertex="1">
      <mxGeometry x="300" y="200" width="78" height="78" as="geometry" />
      </mxCell>"

    or

    "<mxCell id="HcTIs4oWIRr1ZxVhCWka-23" value="Amazon Key Management Service" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#DD344C;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.key_management_service;" vertex="1" parent="1">
      <mxGeometry x="130" y="120" width="78" height="78" as="geometry" />
    </mxCell>"
`
export const sample_gcp_element = `
    <mxCell id="16" value="Compute Engine 123&lt;div&gt;&lt;br&gt;&lt;/div&gt;" style="editableCssRules=.*;html=1;shape=image;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;aspect=fixed;imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjAwMDAwMTkwNzM0ODYzMyIgaGVpZ2h0PSIxNi4wMDAwMDE5MDczNDg2MzMiIHZpZXdCb3g9Ii03LjE4NzExMDA2NTA3Mzg4N2UtMTMgLTIuNDg2ODk5MTA5MjkyMjI5N2UtMTUgMTYuMDAwMDAxOTA3MzQ4NjMzIDE2LjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS44NCA1Ljc3SDYuMTZhLjM5LjM5IDAgMCAwLS4zOS4zOXYzLjY4YS4zOS4zOSAwIDAgMCAuMzkuMzloMy42N2EuMzkuMzkgMCAwIDAgLjM5LS4zOVY2LjE2YS4zOS4zOSAwIDAgMC0uMzktLjM5bTUuODItLjI5YS4zNS4zNSAwIDAgMCAuMzUtLjM1di0uNTdhLjM1LjM1IDAgMCAwLS4zNS0uMzVoLTEuNzlWMi41NGEuMzkuMzkgMCAwIDAtLjM5LS4zOUgxMS44Vi4zNWEuMzUuMzUgMCAwIDAtLjM1LS4zNWgtLjU4YS4zNS4zNSAwIDAgMC0uMzUuMzV2MS43OUg4LjYzVi4zNUEuMzUuMzUgMCAwIDAgOC4yOSAwaC0uNThhLjM1LjM1IDAgMCAwLS4zNS4zNXYxLjc5SDUuNDhWLjM1QS4zNS4zNSAwIDAgMCA1LjEzIDBoLS41OGEuMzUuMzUgMCAwIDAtLjM1LjM1djEuNzlIMi41M2EuMzkuMzkgMCAwIDAtLjM5LjM5VjQuMkguMzVhLjM1LjM1IDAgMCAwLS4zNS4zNXYuNThhLjM1LjM1IDAgMCAwIC4zNS4zNWgxLjc5djEuODhILjM1YS4zNS4zNSAwIDAgMC0uMzUuMzV2LjU4YS4zNS4zNSAwIDAgMCAuMzUuMzVoMS43OXYxLjg5SC4zNWEuMzUuMzUgMCAwIDAtLjM1LjM1di41N2EuMzUuMzUgMCAwIDAgLjM1LjM1aDEuNzl2MS42N2EuMzkuMzkgMCAwIDAgLjM5LjM5SDQuMnYxLjc5YS4zNS4zNSAwIDAgMCAuMzUuMzVoLjU4YS4zNS4zNSAwIDAgMCAuMzUtLjM1di0xLjc5aDEuODh2MS43OWEuMzUuMzUgMCAwIDAgLjM1LjM1aC41OGEuMzUuMzUgMCAwIDAgLjM1LS4zNXYtMS43OWgxLjg5djEuNzlhLjM1LjM1IDAgMCAwIC4zNS4zNWguNTdhLjM1LjM1IDAgMCAwIC4zNS0uMzV2LTEuNzloMS42OGEuMzkuMzkgMCAwIDAgLjM5LS4zOVYxMS44aDEuNzlhLjM1LjM1IDAgMCAwIC4zNC0uMzV2LS41N2EuMzUuMzUgMCAwIDAtLjM1LS4zNWgtMS43OVY4LjY0aDEuNzlhLjM1LjM1IDAgMCAwIC4zNS0uMzV2LS41OGEuMzUuMzUgMCAwIDAtLjM1LS4zNWgtMS43OVY1LjQ4em0tMy4xMSA3LjA3SDMuNDVWMy40Nmg5LjA5eiIvPiYjeGE7PC9zdmc+;" vertex="1" parent="2">
      <mxGeometry x="450" y="100" width="80" height="80" as="geometry" />
    </mxCell>
`