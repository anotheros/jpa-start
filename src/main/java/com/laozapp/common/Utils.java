package com.laozapp.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by Administrator on 2015/11/16.
 */
public class Utils {

    /**
     * @param s
     * @return
     */
    public static String getMD5Encoding(String s) {
        if (s == null) {
            return null;
        }
        byte[] input = s.getBytes();
        String output = null;
        char[] hexChar = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(input);
			/*
			 */
            byte[] tmp = md.digest();
            char[] str = new char[32];
            byte b = 0;
            for (int i = 0; i < 16; i++) {
                b = tmp[i];
                str[2 * i] = hexChar[b >>> 4 & 0xf];
                str[2 * i + 1] = hexChar[b & 0xf];
            }
            output = new String(str);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return output;
    }
    public static void main(String[] args) {
    	System.out.println(getMD5Encoding("zplay123"));
    	System.out.println(getMD5Encoding("dcd50eecc1661ef8c46563dea4ebd379"));
	}
}
