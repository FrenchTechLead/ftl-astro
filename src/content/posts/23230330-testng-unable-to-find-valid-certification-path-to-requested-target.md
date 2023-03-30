---

authorID: akram_mecheri
title: Comment déployer une application spring-boot et Postgres sur Kubernetes
description: "Apprenez à déployer une application spring-boot sur kubernetes avec une base de données Postgres avec un certificat SSL gratuit Let's encrypt."
keywords:
 - Kubernetes
 - Spring-Boot
 - Postgres
 - cert-manager
 - lets-encrypt
tags:
 - Kubernetes
 - Spring-Boot
 - Postgres
 - cert-manager
 - lets-encrypt
lang: fr
draft: true
---
import Separator from '@comps/Separator.jsx'
import img0 from '@assets/blog/tech/20230108-comment-deployer-une-application-spring-boot-sur-kubernetes/0.png'
import img1 from '@assets/blog/tech/20230108-comment-deployer-une-application-spring-boot-sur-kubernetes/1.png'
import img2 from '@assets/blog/tech/20230108-comment-deployer-une-application-spring-boot-sur-kubernetes/2.png'
import img3 from '@assets/blog/tech/20230108-comment-deployer-une-application-spring-boot-sur-kubernetes/3.png'
import img4 from '@assets/blog/tech/20230108-comment-deployer-une-application-spring-boot-sur-kubernetes/4.png'

import Image from '@comps/Image.astro'


## Introduction


org.testng.TestNGException: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	at org.testng.TestNG.initializeSuitesAndJarFile(TestNG.java:340)
	at com.intellij.rt.testng.IDEARemoteTestNG.run(IDEARemoteTestNG.java:39)
	at com.intellij.rt.testng.RemoteTestNGStarter.main(RemoteTestNGStarter.java:105)
Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	at sun.security.provider.certpath.SunCertPathBuilder.build(SunCertPathBuilder.java:141)
	at sun.security.provider.certpath.SunCertPathBuilder.engineBuild(SunCertPathBuilder.java:126)
	at java.security.cert.CertPathBuilder.build(CertPathBuilder.java:280)
	at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:392)
	at sun.security.validator.PKIXValidator.engineValidate(PKIXValidator.java:302)
	at sun.security.validator.Validator.validate(Validator.java:262)
	at sun.security.ssl.X509TrustManagerImpl.validate(X509TrustManagerImpl.java:330)
	at sun.security.ssl.X509TrustManagerImpl.checkTrusted(X509TrustManagerImpl.java:237)
	at sun.security.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:132)
	at sun.security.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1622)
	at sun.security.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:223)
	at sun.security.ssl.Handshaker.processLoop(Handshaker.java:1037)
	at sun.security.ssl.Handshaker.process_record(Handshaker.java:965)
	at sun.security.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:1064)
	at sun.security.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1367)
	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1395)
	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1379)
	at sun.net.www.protocol.https.HttpsClient.afterConnect(HttpsClient.java:559)
	at sun.net.www.protocol.https.AbstractDelegateHttpsURLConnection.connect(AbstractDelegateHttpsURLConnection.java:185)
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1570)
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1498)
	at sun.net.www.protocol.https.HttpsURLConnectionImpl.getInputStream(HttpsURLConnectionImpl.java:268)
	at com.sun.org.apache.xerces.internal.impl.XMLEntityManager.setupCurrentEntity(XMLEntityManager.java:647)
	at com.sun.org.apache.xerces.internal.impl.XMLEntityManager.startEntity(XMLEntityManager.java:1304)
	at com.sun.org.apache.xerces.internal.impl.XMLEntityManager.startDTDEntity(XMLEntityManager.java:1270)
	at com.sun.org.apache.xerces.internal.impl.XMLDTDScannerImpl.setInputSource(XMLDTDScannerImpl.java:264)
	at com.sun.org.apache.xerces.internal.impl.XMLDocumentScannerImpl$DTDDriver.dispatch(XMLDocumentScannerImpl.java:1161)
	at com.sun.org.apache.xerces.internal.impl.XMLDocumentScannerImpl$DTDDriver.next(XMLDocumentScannerImpl.java:1045)
	at com.sun.org.apache.xerces.internal.impl.XMLDocumentScannerImpl$PrologDriver.next(XMLDocumentScannerImpl.java:959)
	at com.sun.org.apache.xerces.internal.impl.XMLDocumentScannerImpl.next(XMLDocumentScannerImpl.java:602)
	at com.sun.org.apache.xerces.internal.impl.XMLDocumentFragmentScannerImpl.scanDocument(XMLDocumentFragmentScannerImpl.java:505)
	at com.sun.org.apache.xerces.internal.parsers.XML11Configuration.parse(XML11Configuration.java:842)
	at com.sun.org.apache.xerces.internal.parsers.XML11Configuration.parse(XML11Configuration.java:771)
	at com.sun.org.apache.xerces.internal.parsers.XMLParser.parse(XMLParser.java:141)
	at com.sun.org.apache.xerces.internal.parsers.AbstractSAXParser.parse(AbstractSAXParser.java:1213)
	at com.sun.org.apache.xerces.internal.jaxp.SAXParserImpl$JAXPSAXParser.parse(SAXParserImpl.java:643)
	at com.sun.org.apache.xerces.internal.jaxp.SAXParserImpl.parse(SAXParserImpl.java:327)
	at javax.xml.parsers.SAXParser.parse(SAXParser.java:195)
	at org.testng.xml.SuiteXmlParser.parse(SuiteXmlParser.java:17)
	at org.testng.xml.SuiteXmlParser.parse(SuiteXmlParser.java:10)
	at org.testng.xml.Parser.parse(Parser.java:172)
	at org.testng.TestNG.initializeSuitesAndJarFile(TestNG.java:310)


    Ajout du certificat SSL pour https://testng.org/  (afin de pouvoir executer les tests depuis intellij.
keytool -import -trustcacerts -keystore C:\Projets\m6\java\jdk1.8.0_231\jre\lib\security\cacerts -storepass changeit -noprompt -alias mycert -file testng.org.crt