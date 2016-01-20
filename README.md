# JAVA应用部署指南

## 准备工作
首先，我们先从github上clone一个java的实例程序。

```sh
$ git clone https://github.com/sinacloud/java-getting-started.git
$ cd java-getting-started
$ ls
pom.xml  Procfile  README.md  src  system.properties
```

这个示例程序使用了maven创建的一个简单的demo，web服务器使用的是jetty，可以在pom.xml看到。

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.sina.sae.sc2</groupId>
  <artifactId>com.sinacloud.sc2</artifactId>
  <packaging>war</packaging>
  <version>1.0</version>
  <name>com.sinacloud.sc2 Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <finalName>com.sinacloud.sc2</finalName>
    <plugins>
     <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-dependency-plugin</artifactId>
      <version>2.3</version>
      <executions>
        <execution>
          <phase>package</phase>
          <goals><goal>copy</goal></goals>
          <configuration>
            <artifactItems>
              <artifactItem>
                <groupId>org.eclipse.jetty</groupId>
                <artifactId>jetty-runner</artifactId>
                <version>9.3.3.v20150827</version>
                <destFileName>jetty-runner.jar</destFileName>
              </artifactItem>
            </artifactItems>
          </configuration>
        </execution>
       </executions>
     </plugin>
    </plugins>
  </build>
</project>
```
程序默认的jdk版本是1.8,如果需要指定jetty版本，可以在system.properties文件中修改。

```
java.runtime.version=1.8
```
## 部署应用

在创建完成应用之后会得到一个git地址类似如下。

```
https://git.sinacloud.com/appname
```
将代码push到对应的git地址

```sh
$ git remote add sc2 https://git.sinacloud.com/appname
$ git push sc2 master:1
```
push到git上之后，可以看到类似如下的maven打包日志

```
Counting objects: 5, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 434 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
remote: Exporting git code...
remote: Uploading...
-----> Java app detected
-----> Installing OpenJDK 1.8... done
-----> Executing: mvn -B -DskipTests clean dependency:list install
       [INFO] Scanning for projects...
       [INFO]
       [INFO] ------------------------------------------------------------------------
       [INFO] Building com.sinacloud.sc2 Maven Webapp 1.0
       [INFO] ------------------------------------------------------------------------
       [INFO]
       [INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ com.sinacloud.sc2 ---
       [INFO]
       [INFO] --- maven-dependency-plugin:2.3:list (default-cli) @ com.sinacloud.sc2 ---
       [INFO]
       [INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ com.sinacloud.sc2 ---
       [WARNING] Using platform encoding (ANSI_X3.4-1968 actually) to copy filtered resources, i.e. build is platform dependent!
       [INFO] Copying 7 resources
       [INFO]
       [INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ com.sinacloud.sc2 ---
       [INFO] No sources to compile
       [INFO]
       [INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ com.sinacloud.sc2 ---
       [WARNING] Using platform encoding (ANSI_X3.4-1968 actually) to copy filtered resources, i.e. build is platform dependent!
       [INFO] skip non existing resourceDirectory /tmp/build/src/test/resources
       [INFO]
       [INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ com.sinacloud.sc2 ---
       [INFO] No sources to compile
       [INFO]
       [INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ com.sinacloud.sc2 ---
       [INFO] Tests are skipped.
       [INFO]
       [INFO] --- maven-war-plugin:2.2:war (default-war) @ com.sinacloud.sc2 ---
       [INFO] Packaging webapp
       [INFO] Assembling webapp [com.sinacloud.sc2] in [/tmp/build/target/com.sinacloud.sc2]
       [INFO] Processing war project
       [INFO] Copying webapp resources [/tmp/build/src/main/webapp]
       [INFO] Webapp assembled in [24 msecs]
       [INFO] Building war: /tmp/build/target/com.sinacloud.sc2.war
       [INFO] WEB-INF/web.xml already added, skipping
       [INFO]
       [INFO] --- maven-dependency-plugin:2.3:copy (default) @ com.sinacloud.sc2 ---
       [INFO] Configured Artifact: org.eclipse.jetty:jetty-runner:9.3.3.v20150827:jar
       [INFO] Copying jetty-runner-9.3.3.v20150827.jar to /tmp/build/target/dependency/jetty-runner.jar
       [INFO]
       [INFO] --- maven-install-plugin:2.4:install (default-install) @ com.sinacloud.sc2 ---
       [INFO] Installing /tmp/build/target/com.sinacloud.sc2.war to /tmp/cache/.m2/repository/com/sina/sae/sc2/com.sinacloud.sc2/1.0/com.sinacloud.sc2-1.0.war
       [INFO] Installing /tmp/build/pom.xml to /tmp/cache/.m2/repository/com/sina/sae/sc2/com.sinacloud.sc2/1.0/com.sinacloud.sc2-1.0.pom
       [INFO] ------------------------------------------------------------------------
       [INFO] BUILD SUCCESS
       [INFO] ------------------------------------------------------------------------
       [INFO] Total time: 1.914 s
       [INFO] Finished at: 2016-01-20T15:19:27+08:00
       [INFO] Final Memory: 16M/723M
       [INFO] ------------------------------------------------------------------------
-----> Discovering process types
       Procfile declares types -> web
-----> Compiled slug size is 55M
remote: Generating docker image...
remote: Pushing image registry.docker.sae.sina.com.cn/testnero2:1c11712 ...............................
remote: Deploy and waiting for app to be ready .......
```
当以上过程完成，访问即可
