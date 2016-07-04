package com.laozapp.util;
import java.io.IOException;
import java.util.Properties;
import java.util.regex.Pattern;

/**
 * 配置文件读取工具类
 * @see -----------------------------------------------------------------------------------------------------------
 * @see -----------------------------------------------------------------------------------------------------------
 * @version v2.1
 * @history v2.1-->增加<code>getPropertyBySysKey()</code>方法,用于获取配置文件的键值中含系统属性时的值,详见该方法注释
 * @history v2.0-->采用枚举的方式实现单例
 * @history v1.0-->通过内部类实现单例
 * @update 2015-2-2 下午05:22:03
 * @create Jun 7, 2012 5:30:10 PM
 * @author 玄玉<http://blog.csdn.net/jadyer>
 */
public enum ConfigUtil {
    INSTANCE;

    private Properties config;

    private ConfigUtil(){
        config = new Properties();
        try {
            config.load(ConfigUtil.class.getResourceAsStream("/config.properties"));
            System.out.println("Load /config.properties SUCCESS...");
        } catch (IOException e) {
            System.out.println("Load /config.properties Error...");
            e.printStackTrace();
            throw new ExceptionInInitializerError("加载系统配置文件失败...");
        }
    }

    public String getProperty(String key){
        return config.getProperty(key);
    }

    public int getPropertyForInt(String key){
        return Integer.parseInt(config.getProperty(key));
    }

    /**
     * 配置文件的键值中含系统属性时的获取方式
     * @create 2015-2-2 下午05:22:03
     * @author 玄玉<http://blog.csdn.net/jadyer>
     */
    public String getPropertyBySysKey(String key){
        String value = config.getProperty(key);
        if(null!=value && Pattern.compile("\\$\\{\\w+(\\.\\w+)*\\}").matcher(value).find()){
            String sysKey = value.substring(value.indexOf("${")+2, value.indexOf("}"));
            value = value.replace("${"+sysKey+"}", System.getProperty(sysKey));
        }
        return value;
    }
}
